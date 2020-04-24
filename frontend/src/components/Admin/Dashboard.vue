<template>
  <div id="dashboard" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5">
            <div class="col-md-12 mt-3 text-left">
              <h1 class="font-color-primary">{{ content.text.header }}</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 text-left">
                  <h3>{{ content.text.room.header }}</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-primary mb-1">{{ content.text.room.all }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.room.data.length }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-success mb-1">{{ content.text.room.active }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.room.isActive }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-danger mb-1">{{ content.text.room.inactive }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.room.isInActive }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div
                  class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                >
                  <h6
                    class="m-0 text-primary"
                  >{{ content.text.room.ranking }} {{ content.room.dataSetRanking.length }} อันดับ</h6>
                  <div class="dropdown no-arrow">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">จัดอันดับ:</div>
                      <a class="dropdown-item" @click="getRoomRanking(5)">5 อันดับ</a>
                      <a class="dropdown-item" @click="getRoomRanking(10)">10 อันดับ</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-area">
                    <canvas id="roomRankingChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div
                  class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                >
                  <h6 class="m-0 text-primary">{{ content.text.room.overview }}</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-pie pt-4 pb-2">
                    <canvas id="roomOverview"></canvas>
                  </div>
                  <div class="mt-4 text-center">
                    <span class="mr-2">
                      <i class="fa fa-circle text-success"></i>
                      {{ content.text.room.active }}
                    </span>
                    <span class="mr-2">
                      <i class="fa fa-circle text-danger"></i>
                      {{ content.text.room.inactive }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 text-left">
                  <h3>{{ content.text.tool.header }}</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-primary mb-1">{{ content.text.tool.all }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.tool.data.length }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-success mb-1">{{ content.text.tool.active }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.tool.isActive }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="h4 text-danger mb-1">{{ content.text.tool.inactive }}</div>
                          <div
                            class="h5 mb-0 font-weight-bold text-gray-800"
                          >{{ content.tool.isInActive }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div
                  class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                >
                  <h6
                    class="m-0 font-weight-bold text-primary"
                  >{{ content.text.tool.ranking }} {{ content.tool.dataSetReportToolInRoomProblemRanking.length }} อันดับ ในช่วง {{ content.tool.labelReportToolInRoomProblemRanking.length }} เดือนที่ผ่านมา</h6>
                  <div class="dropdown no-arrow">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">จัดอันดับ:</div>
                      <a class="dropdown-item" @click="onChangeToolRanking(5)">5 อันดับ</a>
                      <a class="dropdown-item" @click="onChangeToolRanking(10)">10 อันดับ</a>
                      <div class="dropdown-divider"></div>
                      <div class="dropdown-header">เดือน:</div>
                      <a class="dropdown-item" @click="onChangeToolPastMonth(3)">3 เดือน</a>
                      <a class="dropdown-item" @click="onChangeToolPastMonth(6)">6 เดือน</a>
                      <a class="dropdown-item" @click="onChangeToolPastMonth(9)">9 เดือน</a>
                      <a class="dropdown-item" @click="onChangeToolPastMonth(12)">12 เดือน</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-area">
                    <canvas id="toolReportProblemChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div
                  class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                >
                  <h6 class="m-0 font-weight-bold text-primary">{{ content.text.tool.overview }}</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-pie pt-4 pb-2">
                    <canvas id="toolOverviewChart"></canvas>
                  </div>
                  <div class="mt-4 text-center">
                    <span class="mr-2">
                      <i class="fa fa-circle text-success"></i>
                      {{ content.text.tool.active }}
                    </span>
                    <span class="mr-2">
                      <i class="fa fa-circle text-danger"></i>
                      {{ content.text.tool.inactive }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Chart from "chart.js";
import axios from "axios";
const axiosConfig = require("../../assets/config.json");

const HOST = axiosConfig.APIGATEWAY.HOST;
const PORT = axiosConfig.APIGATEWAY.PORT;
const API = "http://" + HOST + ":" + PORT;

let toolReportProblemChart;

export default {
  name: "Dashboard",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getAllRoomInSystem();
    this.getAllToolInSystem();
    this.getRoomRanking(5);
    this.getToolReportProblemRanking(5, 3);
  },
  data() {
    return {
      content: {
        text: {
          header: "Dashboard",
          room: {
            header: "ห้องในระบบ",
            all: "ทั้งหมด",
            active: "เปิดใช้งาน",
            inactive: "ปิดใช้งาน",
            overview: "ภาพรวมห้องในระบบ",
            ranking: "ห้องที่ถูกจองสูงสุด"
          },
          tool: {
            header: "อุปกรณ์ในระบบ",
            all: "ทั้งหมด",
            active: "ใช้งานได้",
            inactive: "ใช้งานไม่ได้",
            overview: "ภาพรวมอุปกรณ์ในระบบ",
            ranking: "ห้องที่ได้รับแจ้งอุปกรณ์เสียหายสูงสุด"
          }
        },
        room: {
          data: [],
          isActive: 0,
          isInActive: 0,
          dataRanking: [],
          labelRanking: [],
          dataSetRanking: []
        },
        tool: {
          data: [],
          isActive: 0,
          isInActive: 0,
          dataReportToolInRoomProblemRanking: [],
          labelReportToolInRoomProblemRanking: [],
          dataSetReportToolInRoomProblemRanking: [],
          ranking: 5,
          month: 3
        }
      },
      monthArray: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยานยน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ]
    };
  },
  mounted() {},
  methods: {
    getAllRoomInSystem() {
      const path = API + "/api/room/all";

      this.content.room.data = [];
      this.content.room.isActive = 0;
      this.content.room.isInActive = 0;

      axios
        .get(path)
        .then(res => {
          if (!res.data.message) {
            for (var index in res.data) {
              this.content.room.data.push({
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName,
                RoomActive: res.data[index].RoomActive
              });

              if (res.data[index].RoomActive) {
                this.content.room.isActive = this.content.room.isActive + 1;
              } else {
                this.content.room.isInActive = this.content.room.isInActive + 1;
              }
            }
          }

          this.roomOverview();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRoomRanking(ranking) {
      const path = API + "/api/room/frequently/ranking";

      let isRanking = ranking;
      this.content.room.dataRanking = [];
      this.content.room.labelRanking = [];
      this.content.room.dataSetRanking = [];

      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin,
        isRanking: isRanking
      };

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            for (var index in res.data.data) {
              this.content.room.dataRanking.push({
                RoomId: res.data.data[index].RoomId,
                RoomName: res.data.data[index].RoomName,
                Number: res.data.data[index].NUMBER
              });

              this.content.room.labelRanking.push(
                res.data.data[index].RoomName
              );
              if (res.data.data[index].NUMBER == 1) {
                this.content.room.dataSetRanking.push(0);
              } else {
                this.content.room.dataSetRanking.push(
                  res.data.data[index].NUMBER
                );
              }
            }
          }

          this.roomRankingChart();
        })
        .catch(error => {
          console.log(error);
        });
    },
    roomOverview() {
      var ctx = document.getElementById("roomOverview");
      var myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["เปิดใช้งาน", "ปิดใช้งาน"],
          datasets: [
            {
              data: [this.content.room.isActive, this.content.room.isInActive],
              backgroundColor: ["#1cc88a", "red"],
              hoverBackgroundColor: ["#17a673", "#CC6666"],
              hoverBorderColor: "rgba(234, 236, 244, 1)"
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
          responsive: true
        }
      });
    },
    roomRankingChart() {
      var ctx = document.getElementById("roomRankingChart");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.content.room.labelRanking,
          datasets: [
            {
              data: this.content.room.dataSetRanking,
              borderColor: "#6E7EF5",
              backgroundColor: "#6E7EF5"
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          }
        }
      });
    },
    getAllToolInSystem() {
      const path = API + "/api/tool/all";

      this.content.tool.data = [];
      this.content.tool.isActive = 0;
      this.content.tool.isInActive = 0;

      axios
        .get(path)
        .then(res => {
          if (!res.data.message) {
            for (var index in res.data) {
              this.content.tool.data.push({
                ToolId: res.data[index].ToolId,
                ToolName: res.data[index].ToolName,
                ToolStatus: res.data[index].ToolStatus,
                RoomId: res.data[index].RoomId
              });

              if (res.data[index].ToolStatus) {
                this.content.tool.isActive = this.content.tool.isActive + 1;
              } else {
                this.content.tool.isInActive = this.content.tool.isInActive + 1;
              }
            }
          }

          this.toolOverviewChart();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toolOverviewChart() {
      var ctx = document.getElementById("toolOverviewChart");
      var myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["ใช้งานได้", "ใช้งานไม่ได้"],
          datasets: [
            {
              data: [this.content.tool.isActive, this.content.tool.isInActive],
              backgroundColor: ["#1cc88a", "red"],
              hoverBackgroundColor: ["#17a673", "#CC6666"],
              hoverBorderColor: "rgba(234, 236, 244, 1)"
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
          responsive: true
        }
      });
    },
    getToolReportProblemRanking(ranking, month) {
      const path = API + "/api/tool/report/frequently/problem/ranking";

      let isRanking = ranking;
      let isMonth = month;

      this.content.tool.dataReportToolInRoomProblemRanking = [];
      this.content.tool.labelReportToolInRoomProblemRanking = [];
      this.content.tool.labelReportToolInRoomProblemRanking = this.getPastMonth(
        isMonth
      );
      this.content.tool.dataSetReportToolInRoomProblemRanking = [];

      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin,
        isRanking: isRanking,
        isMonth: isMonth
      };

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            let data = [];
            let tempLabel = null;
            for (var index in res.data.data) {
              this.content.tool.dataReportToolInRoomProblemRanking.push({
                RoomId: res.data.data[index].RoomId,
                RoomName: res.data.data[index].RoomName,
                Number: res.data.data[index].NUMBER
              });

              if (tempLabel != res.data.data[index].RoomName) {
                for (var indexMonth in this.content.tool.labelReportToolInRoomProblemRanking) {
                  let number = 0;

                  for (var indexData in res.data.data) {
                    if (res.data.data[index].RoomName === res.data.data[indexData].RoomName && this.content.tool.labelReportToolInRoomProblemRanking[indexMonth] === this.monthArray[new Date(res.data.data[indexData].ReportDate).getMonth()]) {
                      number = number + res.data.data[indexData].NUMBER;
                    }
                  }

                  if (number == 0) {
                    data.push(0);
                  } else {
                    data.push(number);
                  }
                }

                let color = this.getRandomColor()

                this.content.tool.dataSetReportToolInRoomProblemRanking.push({
                  label: res.data.data[index].RoomName,
                  data: data,
                  borderColor: color,
                  backgroundColor: color
                });

                data = []

                tempLabel = res.data.data[index].RoomName;

                if(this.content.tool.dataSetReportToolInRoomProblemRanking.length == isRanking) {
                  break;
                }
              }
            }
          }

          this.toolReportProblemChart();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPastMonth(isMonth) {
      var today = new Date();
      var month = 1;
      var currMonth = month;

      var menuMonths = [];
      let count = isMonth;

      while (count > 0) {
        if (currMonth < 0) currMonth += 12;
        if (currMonth >= 12) currMonth -= 12;

        var month = this.monthArray[currMonth];
        menuMonths.push(month);

        currMonth = currMonth + 1;
        count = count - 1;
      }
      return menuMonths;
    },
    toolReportProblemChart() {
      var ctx = document.getElementById("toolReportProblemChart");
      toolReportProblemChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.content.tool.labelReportToolInRoomProblemRanking,
          datasets: this.content.tool.dataSetReportToolInRoomProblemRanking
        },
        options: {
          responsive: true,
          legend: {
            display: true
          }
        }
      });
    },
    onChangeToolRanking(ranking) {
      this.content.tool.ranking = ranking;

      toolReportProblemChart.destroy();

      this.getToolReportProblemRanking(
        this.content.tool.ranking,
        this.content.tool.month
      );
    },
    onChangeToolPastMonth(month) {
      this.content.tool.month = month;

      toolReportProblemChart.destroy();

      this.getToolReportProblemRanking(
        this.content.tool.ranking,
        this.content.tool.month
      );
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>

<style scoped>
.dropdown.no-arrow .dropdown-toggle::after {
  display: none;
}
</style>