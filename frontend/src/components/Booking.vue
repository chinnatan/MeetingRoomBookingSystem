<template>
  <div>
    <navbar></navbar>

    <div>
      <div class="container">
        <div class="row mt-1">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 mx-auto my-auto">
                <div class="row mt-5 p-3">
                  <div class="col-md-12">
                    <h1 class="font-color-primary">{{ txtFloor }} {{ floor }}</h1>
                    <small>แสดงชั้นที่คุณเลือก</small>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="col-md-12">
                          <div
                            class="nav flex-column nav-pills"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <a
                              class="nav-link active booking-font"
                              id="v-pills-floor1-tab"
                              data-toggle="pill"
                              href="#v-pills-floor1"
                              role="tab"
                              aria-controls="v-pills-floor1"
                              aria-selected="true"
                              v-on:click="changeFloor(1)"
                            >{{ txtFloor }} 1</a>
                            <a
                              class="nav-link"
                              id="v-pills-floor2-tab"
                              data-toggle="pill"
                              href="#v-pills-floor2"
                              role="tab"
                              aria-controls="v-pills-floor2"
                              aria-selected="false"
                              v-on:click="changeFloor(2)"
                            >{{ txtFloor }} 2</a>
                            <a
                              class="nav-link"
                              id="v-pills-floor3-tab"
                              data-toggle="pill"
                              href="#v-pills-floor3"
                              role="tab"
                              aria-controls="v-pills-floor3"
                              aria-selected="false"
                              v-on:click="changeFloor(3)"
                            >{{ txtFloor }} 3</a>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="card mt-2 mb-2 shadow-sm">
                            <div class="card-body">
                              <h5 class="font-color-primary">หมายเหตุ</h5>
                              <ul class="list-unstyled">
                                <li>
                                  <font color="green">{{ lblNote.color.lblGreen }}</font>
                                  - {{ lblNote.detail.lblGreen }}
                                </li>
                                <li>
                                  <font color="red">{{ lblNote.color.lblRed }}</font>
                                  - {{ lblNote.detail.lblRed }}
                                </li>
                                <li>
                                  <font color="lightblue">{{ lblNote.color.lblLightBlue }}</font>
                                  - {{ lblNote.detail.lblLightBlue }}
                                </li>
                                <li>
                                  <font color="gray">{{ lblNote.color.lblGray }}</font>
                                  - {{ lblNote.detail.lblGray }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card col-md-8 shadow-sm">
                        <div class="card-body">
                          <div class="col-md-12">
                            <div class="tab-content" id="v-pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="v-pills-floor1"
                                role="tabpanel"
                                aria-labelledby="v-pills-floor1-tab"
                                v-if="floor === 1"
                              >
                                <Floor1></Floor1>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="v-pills-floor2"
                                role="tabpanel"
                                aria-labelledby="v-pills-floor2-tab"
                                v-if="floor === 2"
                              >
                                <Floor2></Floor2>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="v-pills-floor3"
                                role="tabpanel"
                                aria-labelledby="v-pills-floor3-tab"
                                v-if="floor === 3"
                              >
                                <Floor3></Floor3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="form-booking">
      <div class="bg-light" v-if="selected === true">
        <div class="container">
          <div class="row mt-4 py-5">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h2 class="booking-font">{{ txtBooking.lblTitle }}</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div
                    id="alert-message"
                    class="alert alert-danger"
                    role="alert"
                    v-if="alert"
                  >{{ alertMessage }}</div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-4 text-left">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card shadow">
                            <img
                              src="../assets/image/itkmitl-building.jpg"
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <h5
                                        class="card-title booking-font"
                                      >{{ txtBooking.lblRoom }} {{ txtBooking.lblNameRoom }}</h5>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div
                                      class="col-md-6"
                                    >{{ txtFloor }} {{ txtBooking.lblFloorRoom }}</div>
                                    <div
                                      class="col-md-6"
                                    >{{ txtBooking.lblSize }} {{ txtBooking.lblSizeRoom }} คน</div>
                                  </div>
                                  <hr />
                                  <div class="row">
                                    <div class="col-md-12">
                                      <div
                                        class="row"
                                        v-for="(line, index) in room.tool"
                                        v-bind:key="index"
                                      >
                                        <div class="col-md-6">{{ line.ToolName }}</div>
                                        <div class="col-md-6" v-if="line.ToolStatus">
                                          <font color="#00ff00">สามารถใช้งานได้</font>
                                        </div>
                                        <div class="col-md-6" v-else>
                                          <font color="red">ไม่สามารถใช้งานได้</font>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row my-2">
                        <div class="col-md-12">
                          <button
                            type="reset"
                            class="btn btn-info col-md-12 booking-font"
                            data-toggle="modal"
                            data-target="#booking-schedule-modal"
                            @click="getBookingScheduleCurDate(txtBooking.lblRoomId)"
                          >{{ txtBooking.lblBookingSchedule }}</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 text-left">
                      <div class="row">
                        <div class="col-md-12">
                          <form method="POST" @submit.prevent="preSendBooking">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingTitle"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingTitle }}</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.inputBookingTitle"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingDetail"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingDetail }}</label>
                                  <textarea
                                    class="form-control"
                                    v-model="form.inputBookingDetail"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingAttendees"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingAttendees }}</label>
                                  <input
                                    type="number"
                                    class="form-control"
                                    min="1"
                                    v-model="form.inputBookingAttendees"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingStartDate"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingStartDate }}</label>
                                  <input
                                    type="date"
                                    :min="form.currentDate"
                                    class="form-control"
                                    v-model="form.inputBookingStartDate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingStartTime"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingStartTime }}</label>
                                  <input
                                    type="time"
                                    min="09:00:00"
                                    max="23:00:00"
                                    class="form-control"
                                    v-model="form.inputBookingStartTime"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingEndTime"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingEndTime }}</label>
                                  <input
                                    type="time"
                                    min="09:00:00"
                                    max="23:00:00"
                                    class="form-control"
                                    v-model="form.inputBookingEndTime"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <button
                                    type="submit"
                                    class="btn btn-primary col-md-12 booking-font"
                                  >{{ txtBooking.btnBookingAccept }}</button>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <button
                                    type="reset"
                                    class="btn btn-danger col-md-12 booking-font"
                                    @click="onReset()"
                                  >{{ txtBooking.btnBookingReset }}</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade text-left"
      id="booking-schedule-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title font-color-primary"
              id="booking-schedule-title"
            >{{ modal.text.title }} {{ txtBooking.lblNameRoom }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5
              class="modal-title text-center"
              id="booking-schedule-not-found"
              v-if="modal.schedule.length === 0"
            >ไม่พบข้อมูลการจอง</h5>
            <div class="table-responsive" v-if="modal.schedule.length !== 0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">{{ modal.text.table.BookingTitle }}</th>
                    <th scope="col">{{ modal.text.table.BookingStartDate }}</th>
                    <th scope="col">{{ modal.text.table.BookingStartTime }}</th>
                    <th scope="col">{{ modal.text.table.BookingEndTime }}</th>
                    <th scope="col">{{ modal.text.table.Fullname }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(line, index) in modal.schedule" v-bind:key="index">
                    <td>
                      <font
                        color="red"
                        v-if="modal.notavaliable === true && index == 0"
                      >{{ line.BookingTitle }}</font>
                      <font color="black" v-else>{{ line.BookingTitle }}</font>
                    </td>
                    <td>
                      <font
                        color="red"
                        v-if="modal.notavaliable === true && index == 0"
                      >{{ line.BookingStartDate }}</font>
                      <font color="black" v-else>{{ line.BookingStartDate }}</font>
                    </td>
                    <td>
                      <font
                        color="red"
                        v-if="modal.notavaliable === true && index == 0"
                      >{{ line.BookingStartTime }}</font>
                      <font color="black" v-else>{{ line.BookingStartTime }}</font>
                    </td>
                    <td>
                      <font
                        color="red"
                        v-if="modal.notavaliable === true && index == 0"
                      >{{ line.BookingEndTime }}</font>
                      <font color="black" v-else>{{ line.BookingEndTime }}</font>
                    </td>
                    <td>
                      <font
                        color="red"
                        v-if="modal.notavaliable === true && index == 0"
                      >{{ line.Fullname }}</font>
                      <font color="black" v-else>{{ line.Fullname }}</font>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "../router";

import Floor1 from "@/components/Floor/Floor1";
import Floor2 from "@/components/Floor/Floor2";
import Floor3 from "@/components/Floor/Floor3";

import axios from "axios";
const axiosConfig = require("../assets/config.json");

export default {
  name: "Booking",
  components: {
    Navbar: Navbar,
    Floor1: Floor1,
    Floor2: Floor2,
    Floor3: Floor3
  },
  created() {},
  data() {
    return {
      selected: false,
      alert: false,
      alertMessage: null,
      floor: 1,
      txtFloor: "ชั้นที่ :",
      txtBooking: {
        lblTitle: "จองห้อง",
        lblRoom: "ห้อง :",
        lblSize: "รองรับ : ",
        lblBookingTitle: "หัวข้อการจอง",
        lblBookingStartDate: "วันที่ต้องการจอง",
        lblBookingStartTime: "เวลาเริ่มต้น",
        lblBookingEndTime: "เวลาสิ้นสุด",
        lblBookingDetail: "รายละเอียดการจอง",
        lblBookingSchedule: "ดูตารางเวลา",
        lblBookingAttendees: "จำนวนผู้เข้าร่วม",
        lblRoomId: "",
        lblNameRoom: "",
        lblSizeRoom: "",
        lblFloorRoom: "",
        lblPathImgRoom: "",
        btnBookingAccept: "ยืนยันการจอง",
        btnBookingReset: "คืนค่า"
      },
      lblNote: {
        color: {
          lblGreen: "สีเขียว",
          lblRed: "สีแดง",
          lblLightBlue: "สีฟ้า",
          lblGray: "สีเทา"
        },
        detail: {
          lblGreen: "ห้องว่าง ณ ขณะนั้น",
          lblRed: "ห้องไม่ว่าง ณ ขณะนั้น",
          lblLightBlue: "ห้องบริการการศึกษา",
          lblGray: "ห้องไม่เปิดให้ใช้งาน"
        }
      },
      form: {
        inputBookingTitle: null,
        inputBookingDetail: null,
        inputBookingStartDate: null,
        inputBookingStartTime: null,
        inputBookingEndTime: null,
        inputBookingAttendees: null,
        currentDate: null,
        currentTime: null
      },
      modal: {
        text: {
          title: "ตารางเวลาของห้อง",
          table: {
            BookingTitle: "หัวข้อการจอง",
            BookingStartDate: "วันที่จอง",
            BookingStartTime: "เวลาเริ่มต้น",
            BookingEndTime: "เวลาสิ้นสุด",
            Fullname: "ผู้ทำการจอง"
          }
        },
        schedule: [],
        notavaliable: false
      },
      room: {
        tool: []
      }
    };
  },
  methods: {
    selectRoom(id, name, size, floor, path) {
      this.selected = true;
      setTimeout(function() {
        document
          .getElementById("form-booking")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
      this.txtBooking.lblRoomId = id;
      this.txtBooking.lblNameRoom = name;
      this.txtBooking.lblSizeRoom = size;
      this.txtBooking.lblFloorRoom = floor;
      this.txtBooking.lblPathImgRoom = path;

      // Set Up Current Date
      var dateFormat = require("dateformat");
      this.form.currentDate = new Date();
      this.form.currentTime = dateFormat(this.form.currentDate, "HH:MM");
      this.form.currentDate = dateFormat(this.form.currentDate, "yyyy-mm-dd");

      this.form.inputBookingStartDate = this.form.currentDate;
      this.form.inputBookingStartTime = this.form.currentTime;

      this.getToolByRoomId(id);

      this.alert = false;
      this.alertMessage = null;
    },
    changeFloor(floor) {
      this.floor = floor;
      this.selected = false;
    },
    preSendBooking() {
      // Validate
      if (
        this.form.inputBookingTitle == null ||
        this.form.inputBookingDetail == null ||
        this.form.inputBookingStartDate == null ||
        this.form.inputBookingStartTime == null ||
        this.form.inputBookingEndTime == null ||
        this.form.inputBookingAttendees == null
      ) {
        this.alertDanger("กรุณากรอกข้อมูลให้ครบถ้วน");
        document
          .getElementById("form-booking")
          .scrollIntoView({ behavior: "smooth" });
      } else if (
        this.form.inputBookingStartDate > this.form.inputBookingEndDate
      ) {
        this.alertDanger(
          "ไม่สามารถทำรายการได้ เนื่องจากวันที่เริ่มต้นมากกว่าวันที่สิ้นสุด"
        );
        document
          .getElementById("form-booking")
          .scrollIntoView({ behavior: "smooth" });
      } else {
        const results = {
          BookingTitle: this.form.inputBookingTitle,
          BookingDetail: this.form.inputBookingDetail,
          BookingStartDate: this.form.inputBookingStartDate,
          BookingStartTime: this.form.inputBookingStartTime,
          BookingEndTime: this.form.inputBookingEndTime,
          BookingAttendees: this.form.inputBookingAttendees,
          UserId: JSON.parse(localStorage.getItem("user")).id,
          UserEmail: JSON.parse(localStorage.getItem("user")).mail,
          RoomId: this.txtBooking.lblRoomId
        };

        this.SendBooking(results);
      }
    },
    SendBooking(results) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/send";

      const headers = {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token"))
      };

      try {
        axios
          .post(path, JSON.stringify(results), { headers: headers })
          .then(res => {
            let response = res.data;
            if (response.error_message) {
              this.alertDanger(response.error_message);
              this.alert = true;
              document
                .getElementById("form-booking")
                .scrollIntoView({ behavior: "smooth" });
            } else {
              if (response.isTokenValid) {
                this.$swal({
                  title: "Token Notification",
                  text: response.message,
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "red",
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                  showCloseButton: true,
                  showLoaderOnConfirm: true
                }).then(result => {
                  if (result.value) {
                    localStorage.clear();
                    router.push({ name: "SignIn" });
                  }
                });
              } else if (response.isBanned) {
                router.push({ name: "Permission" });
              } else {
                this.alertSuccess(response.message, response.pin);
                this.alert = false;
              }
            }
          })
          .catch(error => {
            console.log(error);
            this.alert = true;
          });
      } catch (err) {
        console.log(err);
      }
    },
    onReset() {
      this.form.inputBookingTitle = null;
      this.form.inputBookingDetail = null;
      this.form.inputBookingStartDate = null;
      this.form.inputBookingEndDate = null;
      this.form.inputBookingStartTime = null;
      this.form.inputBookingEndTime = null;
      this.form.inputBookingAttendees = null;
      this.form.currentDate = null;
      this.form.currentTime = null;

      // Set Up Current Date
      var dateFormat = require("dateformat");
      this.form.currentDate = new Date();
      this.form.currentTime = dateFormat(this.form.currentDate, "HH:MM");
      this.form.currentDate = dateFormat(this.form.currentDate, "yyyy-mm-dd");

      this.form.inputBookingStartDate = this.form.currentDate;
      this.form.inputBookingStartTime = this.form.currentTime;
    },
    alertDanger(message) {
      this.alert = true;
      this.alertMessage = message;
    },
    alertSuccess(message, pin) {
      this.$swal(message, "รหัสผ่าน " + pin, "success");
      this.onReset();
      this.selected = false;
    },
    getBookingScheduleCurDate(roomId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/room/" +
        roomId +
        axiosConfig.PATH.getRoomBookingStatusCurDateById;

      const pathTimeNow =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/room/" +
        roomId +
        "/booking/time/now";

      var dateFormat = require("dateformat");
      this.modal.schedule = [];

      axios
        .get(pathTimeNow)
        .then(res => {
          if (res.data[0] != null) {
            this.modal.notavaliable = true;
            this.modal.schedule.push({
              BookingTitle: res.data[0].BookingTitle,
              BookingStartDate: dateFormat(
                res.data[0].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingEndDate: dateFormat(
                res.data[0].BookingEndDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                res.data[0].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(res.data[0].BookingEndDate, "HH:MM"),
              Fullname: res.data[0].Fullname
            });
          } else {
            this.modal.notavaliable = false;
          }
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var scheduleIndex in res.data) {
              this.modal.schedule.push({
                BookingTitle: res.data[scheduleIndex].BookingTitle,
                BookingStartDate: dateFormat(
                  res.data[scheduleIndex].BookingStartDate,
                  "dd/mm/yyyy"
                ),
                BookingEndDate: dateFormat(
                  res.data[scheduleIndex].BookingEndDate,
                  "dd/mm/yyyy"
                ),
                BookingStartTime: dateFormat(
                  res.data[scheduleIndex].BookingStartDate,
                  "HH:MM"
                ),
                BookingEndTime: dateFormat(
                  res.data[scheduleIndex].BookingEndDate,
                  "HH:MM"
                ),
                Fullname: res.data[scheduleIndex].Fullname
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getToolByRoomId(roomId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/" +
        roomId;

      this.room.tool = [];

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var toolIndex in res.data) {
              this.room.tool.push({
                ToolId: res.data[toolIndex].ToolId,
                ToolName: res.data[toolIndex].ToolName,
                ToolStatus: res.data[toolIndex].ToolStatus,
                RoomId: res.data[toolIndex].RoomId
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.booking-font {
  font-family: "Mitr-Medium";
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
}

.cursor-pointer {
  cursor: pointer;
}

rect:hover {
  stroke-width: 2;
  stroke: #01579b;
}

.bg-title {
  background-color: #0277bd;
}
</style>