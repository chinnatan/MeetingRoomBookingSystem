#include <ArduinoJson.h>
#include <SocketIoClient.h>
#include <ESP8266WiFi.h>
#include <TaskScheduler.h>
#include <SoftwareSerial.h>

#define _TASK_SLEEP_ON_IDLE_RUN
#define _TASK_TIMEOUT

SoftwareSerial nodeMcuSerial(D2, D3); // RX | TX

Scheduler runTask;
Scheduler runCheckSaveDate;

SocketIoClient webSocket;

// RUNTASK SCHEDULER
void runTaskRoomM03();
void runTaskRoomM04();

Task runTaskM03(50, 2, &runTaskRoomM03);
Task runTaskM04(50, 2, &runTaskRoomM04);

// RUNCHECKSAVEDATE SCHEDULER
void runCheck();

Task runCheckSaveEndDate(100, TASK_FOREVER, &runCheck, &runCheckSaveDate, true);

const char* ssid     = "MAENUI Floor 1";
const char* password = "maenui2563";

const char* ROOMM03 = "4";
const char* ROOMM04 = "5";

long roomM03 = 0;
long roomM04 = 0;

void setup() {
  Serial.begin(115200);

  // WIFI Configuration
  Serial.println("Starting...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(250);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Socket Configuration
  webSocket.on("sendRoomIdToNodeMCU", socketRoomIdEvent);
  webSocket.begin("192.168.1.2", 4002);

  // Software Serial Configuration
  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
  nodeMcuSerial.begin(9600); // Software Serial ที่ NodeMCU ใช้สื่อสากับ Arduino Uno

  runTask.init();
  runTask.addTask(runTaskM03);
  runTask.addTask(runTaskM04);

  runCheckSaveDate.startNow();
}

void socketRoomIdEvent(const char* payload, size_t length) {
  Serial.printf("got message roomid: %s\n", payload);
  int resultsM03 = strcmp(payload, ROOMM03);
  if (resultsM03 == 0) {
    roomM03 = atoi(payload);
    runTaskM03.enable();
  }
  int resultsM04 = strcmp(payload, ROOMM04);
  if (resultsM04 == 0) {
    roomM04 = atoi(payload);
    runTaskM04.enable();
  }
}

void runTaskRoomM03() {
  Serial.println("RUN TASK ROOM M04");
  if (runTaskM03.isFirstIteration()) {
    nodeMcuSerial.println(3);
  }

  if (runTaskM03.isLastIteration()) {
    nodeMcuSerial.println(3);
    runTaskM03.setIterations(2);
    runTaskM03.disable();
  }
}

void runTaskRoomM04() {
  Serial.println("RUN TASK ROOM M04");
  if (runTaskM04.isFirstIteration()) {
    nodeMcuSerial.println(1);
  }

  if (runTaskM04.isLastIteration()) {
    nodeMcuSerial.println(1);
    runTaskM04.setIterations(2);
    runTaskM04.disable();
  }
}

int tempValRunCheck = 0;
int runCheckCount = 0;

void runCheck() {
  if (nodeMcuSerial.available() > 0) {
    if (nodeMcuSerial.read() == '\n') {
      char valCharRunCheck[50];
      int valRunCheck = nodeMcuSerial.parseInt();
      if (valRunCheck != 0 && tempValRunCheck != valRunCheck) {
        tempValRunCheck = valRunCheck;
        String strRunCheck = String(valRunCheck);
        strRunCheck.toCharArray(valCharRunCheck, 50);
        webSocket.emit("triggerSaveEndDate", valCharRunCheck);
        runCheckCount++;
      } else if(valRunCheck == 0) {
        tempValRunCheck = 0;
      }
    }
  }
}

void loop() {
  runTask.execute();
  webSocket.loop();
  runCheckSaveDate.execute();
}
