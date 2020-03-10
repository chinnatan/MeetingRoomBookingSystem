#define _TASK_SLEEP_ON_IDLE_RUN
#define _TASK_TIMEOUT

#include <TaskScheduler.h>
#include <SoftwareSerial.h>

SoftwareSerial unoSerial(3, 2); // RX | TX

Scheduler runner;
Scheduler runTask;
Scheduler runSendRoomNo;

// RUNNER SCHEDULER
void doorOpen5seM03CallBack();
void doorOpen5secM03Disable();
void doorOpen5secondsCallBack();
void doorOpen5secondsDisable();

Task doorOpen5secM03(1 * TASK_SECOND, TASK_FOREVER, &doorOpen5seM03CallBack, &runner, false, NULL, &doorOpen5secM03Disable);
Task doorOpen5seconds(1 * TASK_SECOND, TASK_FOREVER, &doorOpen5secondsCallBack, &runner, false, NULL, &doorOpen5secondsDisable);

// RUNTASK SCHEDULER
void runTaskRoomM03();
void runTaskRoomM04();

Task runTaskM03(25, TASK_FOREVER, &runTaskRoomM03, &runTask, true);
Task runTaskM04(25, TASK_FOREVER, &runTaskRoomM04, &runTask, true);

// RUNSENROOMNO SCHEDULER
void sendRoomNo();

Task taskSendRoomNo(100, 1, &sendRoomNo);

const int magneticSwitchM03 = 6;
const int magneticSwitchM04 = 7;

const int buzzerM03 = 8;
const int buttonM03 = 9;
const int lockM03 =  10;
const int buzzerM04 = 11;
const int buttonM04 = 12;
const int lockM04 =  13;

int buttonStateM03 = HIGH;
int magneticSwitchStateM03 = 0;
int buzzerStateM03 = 0;
int buttonStateM04 = HIGH;
int magneticSwitchStateM04 = 0;
int buzzerStateM04 = 0;

void doorOpen5seM03CallBack() {
//  Serial.println("Enabled DOOR M03");
  digitalWrite(lockM03, HIGH);
}

void doorOpen5secM03Disable() {
  if (doorOpen5secM03.timedOut()) {
    magneticSwitchStateM03 = digitalRead(magneticSwitchM03);
    Serial.print("MAGNETIC SWITCH M03 : ");
    Serial.println(magneticSwitchStateM03);
    if (magneticSwitchStateM03 > 0) {
      Serial.println("BUZZER ON");
      digitalWrite(buzzerM03, HIGH);
      digitalWrite(lockM03, HIGH);
      doorOpen5secM03.setTimeout(2 * TASK_SECOND);
      doorOpen5secM03.resetTimeout();
      doorOpen5secM03.enable();
    } else {
      Serial.println("BUZZER OFF");
      digitalWrite(buzzerM03, LOW);
      digitalWrite(lockM03, LOW);
      doorOpen5secM03.setTimeout(5 * TASK_SECOND);
    }
  } else {
    digitalWrite(lockM03, LOW);
    doorOpen5secM03.setTimeout(5 * TASK_SECOND);
  }
}

void doorOpen5secondsCallBack() {
//  Serial.println("Enabled DOOR");
  digitalWrite(lockM04, HIGH);
}

void doorOpen5secondsDisable() {
  if (doorOpen5seconds.timedOut()) {
    magneticSwitchStateM04 = digitalRead(magneticSwitchM04);
    Serial.print("MAGNETIC SWITCH M04 : ");
    Serial.println(magneticSwitchStateM04);
    if (magneticSwitchStateM04 > 0) {
      Serial.println("BUZZER ON");
      digitalWrite(buzzerM04, HIGH);
      digitalWrite(lockM04, HIGH);
      doorOpen5seconds.setTimeout(2 * TASK_SECOND);
      doorOpen5seconds.resetTimeout();
      doorOpen5seconds.enable();
    } else {
      Serial.println("BUZZER OFF");
      digitalWrite(buzzerM04, LOW);
      digitalWrite(lockM04, LOW);
      doorOpen5seconds.setTimeout(5 * TASK_SECOND);
    }
  } else {
    digitalWrite(lockM04, LOW);
    doorOpen5seconds.setTimeout(5 * TASK_SECOND);
  }
}

void runTaskRoomM03() {
  if (unoSerial.available() > 0) {
    if (unoSerial.read() == '\n') {
      int valRoomM03 = unoSerial.parseInt();
      //      Serial.print("VAL UNO ROOMM03 : ");
      //      Serial.println(valRoomM03);

      if (valRoomM03 == 3) {
        doorOpen5secM03.enable(); // Room M03
      } else if (valRoomM03 == 1) {
        doorOpen5seconds.enable(); // Room M04
      } else {
        buttonStateM03 = digitalRead(buttonM03);
        if (buttonStateM03 == LOW) { // กดปุ่ม
          unoSerial.println(3);
          doorOpen5secM03.enable(); // Room M03
        }
      }
    } else {
      buttonStateM03 = digitalRead(buttonM03);
      if (buttonStateM03 == LOW) { // กดปุ่ม
        unoSerial.println(3);
        doorOpen5secM03.enable(); // Room M03
      }
    }
  } else {
    buttonStateM03 = digitalRead(buttonM03);
    if (buttonStateM03 == LOW) { // กดปุ่ม
      taskSendRoomNo.enable();
      doorOpen5secM03.enable(); // Room M03
    }
  }
}

void runTaskRoomM04() {
  if (unoSerial.available() > 0) {
    if (unoSerial.read() == '\n') {
      int val = unoSerial.parseInt();
      //      Serial.print("VAL UNO : ");
      //      Serial.println(val);

      if (val == 1) {
        doorOpen5seconds.enable(); // Room M04
      } else if (val == 3) {
        doorOpen5secM03.enable(); // Room M03
      } else {
        buttonStateM04 = digitalRead(buttonM04);
        if (buttonStateM04 == LOW) { // กดปุ่ม
          doorOpen5seconds.enable(); // Room M04
        }
      }
    } else {
      buttonStateM04 = digitalRead(buttonM04);
      if (buttonStateM04 == LOW) { // กดปุ่ม
        doorOpen5seconds.enable(); // Room M04
      }
    }
  } else {
    buttonStateM04 = digitalRead(buttonM04);
    if (buttonStateM04 == LOW) { // กดปุ่ม
      taskSendRoomNo.enable();
      doorOpen5seconds.enable(); // Room M04
    }
  }
}

void sendRoomNo() {
  if (taskSendRoomNo.isFirstIteration()) {
    if (buttonStateM03 == LOW) {
      unoSerial.println(3);
    }

    if (buttonStateM04 == LOW) {
      unoSerial.println(1);
    }
  }

  if (taskSendRoomNo.isLastIteration()) {
    if (buttonStateM03 == LOW) {
      unoSerial.println(3);
    }

    if (buttonStateM04 == LOW) {
      unoSerial.println(1);
    }
    taskSendRoomNo.setIterations(1);
    taskSendRoomNo.disable();
  }
}


void setup() {
  pinMode(lockM03, OUTPUT);
  pinMode(buzzerM03, OUTPUT);
  pinMode(magneticSwitchM03, INPUT_PULLUP);
  pinMode(buttonM03, INPUT_PULLUP);

  pinMode(lockM04, OUTPUT);
  pinMode(buzzerM04, OUTPUT);
  pinMode(magneticSwitchM04, INPUT_PULLUP);
  pinMode(buttonM04, INPUT_PULLUP);

  doorOpen5secM03.setTimeout(5 * TASK_SECOND);
  doorOpen5seconds.setTimeout(5 * TASK_SECOND);

  pinMode(3, INPUT); // RX
  pinMode(2, OUTPUT); // TX
  Serial.begin(115200);
  unoSerial.begin(9600);

  runTask.startNow();
  runSendRoomNo.init();
  runSendRoomNo.addTask(taskSendRoomNo);
}

void loop() {
  //  runTaskRoomM03();
  //  runTaskRoomM04();
  runner.execute();
  runTask.execute();
  runSendRoomNo.execute();
}
