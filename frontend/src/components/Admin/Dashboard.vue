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
                  <h6 class="m-0 text-primary">{{ content.text.room.top5 }}</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-area">
                    <canvas id="roomTop5Chart"></canvas>
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
                          <div class="h4 text-success mb-1">{{ content.text.tool.active }}</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">10</div>
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
                          <div class="h5 mb-0 font-weight-bold text-gray-800">90</div>
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
                  <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
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
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-area">
                    <canvas id="my-chart"></canvas>
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
                  <h6 class="m-0 font-weight-bold text-primary">Revenue Sources</h6>
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
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-pie pt-4 pb-2">
                    <canvas id="myPieChart"></canvas>
                  </div>
                  <div class="mt-4 text-center small">
                    <span class="mr-2">
                      <i class="fas fa-circle text-primary"></i> Direct
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-success"></i> Social
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-info"></i> Referral
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
const API = "http://" + HOST + ":" + PORT

export default {
  name: "Dashboard",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getAllRoomInSystem();
    this.getRoomUseTop5();
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
            top5: "ห้องที่ถูกใช้งานสูงสุด 5 อันดับ"
          },
          tool: {
            header: "อุปกรณ์ในระบบ",
            all: "ทั้งหมด",
            active: "ใช้งานได้",
            inactive: "ใช้งานไม่ได้"
          }
        },
        room: {
          data: [],
          isActive: 0,
          isInActive: 0,
          dataTop5: [],
          labelTop5: [],
          dataSetTop5: []
        }
      }
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
    getRoomUseTop5() {
      const path = API + "/api/room/frequently/top5";

      this.content.room.dataTop5 = [];

      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            for (var index in res.data.data) {
              this.content.room.dataTop5.push({
                RoomId: res.data.data[index].RoomId,
                RoomName: res.data.data[index].RoomName,
                Number: res.data.data[index].NUMBER
              });

              this.content.room.labelTop5.push(res.data.data[index].RoomName);
              this.content.room.dataSetTop5.push(res.data.data[index].NUMBER);
            }
          }

          this.roomTop5Chart();
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
    roomTop5Chart() {
      var ctx = document.getElementById("roomTop5Chart");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.content.room.labelTop5,
          datasets: [
            {
              data: this.content.room.dataSetTop5,
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
    }
  }
};
</script>