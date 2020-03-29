<template>
  <div id="mange-booking" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 p-3">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="card-title">{{ content.text.filter.title }}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-row text-left">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="select-room">{{ content.text.filter.select_room_label }}</label>
                            <select
                              class="form-control"
                              v-model="content.filter.room"
                              @change="onFilter()"
                            >
                              <option
                                :value="content.filter.room"
                                selected
                                disabled
                                hidden
                              >{{ content.filter.room }}</option>
                              <option
                                v-for="(name, index) in content.filter.table.room"
                                :key="index"
                                :value="name.RoomName"
                              >{{ name.RoomName }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              for="select-start-date"
                            >{{ content.text.filter.select_start_date_label }}</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="content.filter.startDate"
                              @change="onFilter()"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              for="select-end-date"
                            >{{ content.text.filter.select_end_date_label }}</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="content.filter.endDate"
                              @change="onFilter()"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3 mb-5">
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row">
                    <div
                      class="col-md-12"
                      v-if="content.booking.table.length == 0 || content.booking.table.length == 1"
                    >{{ content.text.message }}</div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive" v-if="content.booking.table.length > 1">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">{{ content.text.manage.table.thead_no0 }}</th>
                              <th scope="col">{{ content.text.manage.table.thead_no1 }}</th>
                              <th scope="col">{{ content.text.manage.table.thead_no2 }}</th>
                              <th scope="col">{{ content.text.manage.table.thead_no3 }}</th>
                              <th scope="col">{{ content.text.manage.table.thead_no4 }}</th>
                              <th scope="col">{{ content.text.manage.table.thead_no5 }}</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody v-for="index in content.booking.row" v-bind:key="index">
                            <tr v-if="index < content.booking.table.length">
                              <th scope="row">{{ index }}</th>
                              <td>{{ content.booking.table[index].BookingTitle }}</td>
                              <td>{{ content.booking.table[index].RoomName }}</td>
                              <td>{{ content.booking.table[index].BookingStartDate }}</td>
                              <td>{{ content.booking.table[index].BookingStartTime }}</td>
                              <td>{{ content.booking.table[index].BookingEndTime }}</td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-sm btn-info"
                                  data-toggle="modal"
                                  data-target="#edit-booking-modal"
                                  @click="getBookingByBookingId(content.booking.table[index].BookingId)"
                                >
                                  <i class="fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-sm btn-danger"
                                  @click="preSendCancelBooking(content.booking.table[index].BookingId)"
                                >
                                  <i class="fa fa-window-close"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" v-if="content.booking.table.length > 1">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-variasi-warna"
                        @click="content.booking.row += 5"
                        v-if="content.booking.row < content.booking.table.length"
                      >{{ content.text.loadmore }}</button>
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
      id="edit-booking-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title font-color-primary"
              id="booking-schedule-title"
            >{{ content.text.modal.edit_title }} {{ content.modal.edit_booking.form.readonly.RoomName }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div
                  id="alert-message"
                  class="alert alert-danger"
                  role="alert"
                  v-if="content.text.message"
                >{{ content.text.message }}</div>
              </div>
            </div>
            <form method="POST" @submit.prevent="preSendEditBooking">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      for="BookingTitle"
                      class="booking-font"
                    >{{ content.text.modal.BookingTitle }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingTitle"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      for="BookingDetail"
                      class="booking-font"
                    >{{ content.text.modal.BookingDetail }}</label>
                    <textarea
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingDetail"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      for="BookingAttendees"
                      class="booking-font"
                    >{{ content.text.modal.BookingAttendees }}</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingAttendees"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      for="BookingStartDate"
                      class="booking-font"
                    >{{ content.text.modal.BookingStartDate }}</label>
                    <input
                      type="date"
                      :min="content.modal.edit_booking.form.currentDate"
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingStartDate"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label
                      for="BookingStartTime"
                      class="booking-font"
                    >{{ content.text.modal.BookingStartTime }}</label>
                    <input
                      type="time"
                      min="09:00:00"
                      max="23:00:00"
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingStartTime"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label
                      for="BookingEndTime"
                      class="booking-font"
                    >{{ content.text.modal.BookingEndTime }}</label>
                    <input
                      type="time"
                      min="09:00:00"
                      max="23:00:00"
                      class="form-control"
                      v-model="content.modal.edit_booking.form.BookingEndTime"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn btn-success col-md-12 booking-font"
                    >{{ content.text.modal.button.save }}</button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn btn-danger col-md-12 booking-font"
                      data-dismiss="modal"
                    >{{ content.text.modal.button.cancel }}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import axios from "axios";
const axiosConfig = require("../assets/config.json");

export default {
  name: "ManageBooking",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getBookingByUserId(JSON.parse(localStorage.getItem("user")).id);
    this.getAllRoomName();
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการการจอง",
          message: "ไม่พบรายการการจองห้องของคุณ หรือคุณอาจจะยังไม่เคยทำการจองห้อง",
          loadmore: "โหลดข้อมูลเพิ่มเติม",
          filter: {
            title: "กรองข้อมูลตาม",
            select_room_label: "เลือกห้องที่ต้องการ",
            select_start_date_label: "เลือกวันที่ต้องการเริ่มต้น",
            select_end_date_label: "เลือกวันที่ต้องการสิ้นสุด",
            option: {
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--"
            }
          },
          manage: {
            table: {
              thead_no0: "#",
              thead_no1: "หัวข้อการจอง",
              thead_no2: "ห้อง",
              thead_no3: "วันที่จอง",
              thead_no4: "เวลาเริ่มต้น",
              thead_no5: "เวลาสิ้นสุด"
            }
          },
          modal: {
            edit_title: "แก้ไขการจองของห้อง",
            BookingTitle: "หัวข้อการจอง",
            BookingDetail: "รายละเอียดการจอง",
            BookingStartDate: "วันที่ต้องการจอง",
            BookingStartTime: "เวลาเริ่มต้น",
            BookingEndTime: "เวลาสิ้นสุด",
            BookingAttendees: "จำนวนผู้เข้าร่วม",
            button: {
              save: "บันทึก",
              cancel: "ยกเลิก"
            }
          }
        },
        booking: {
          table: [
            {
              BookingId: undefined,
              BookingTitle: undefined,
              RoomName: undefined,
              BookingStartDate: undefined,
              BookingStartTime: undefined,
              BookingEndTime: undefined
            }
          ],
          tempTable: [{}],
          row: 5
        },
        modal: {
          edit_booking: {
            form: {
              readonly: {
                BookingId: null,
                RoomId: null,
                RoomName: null
              },
              BookingTitle: null,
              BookingDetail: null,
              BookingStartDate: null,
              BookingStartTime: null,
              BookingEndTime: null,
              BookingAttendees: null,
              currentDate: null
            }
          }
        },
        filter: {
          table: {
            room: []
          },
          room: "--กรุณาเลือกห้องที่ต้องการ--",
          startDate: null,
          endDate: null
        }
      }
    };
  },
  methods: {
    getBookingByUserId(userId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/user/" +
        userId;
      var dateFormat = require("dateformat");

      this.content.booking.table = [
        {
          BookingId: undefined,
          BookingTitle: undefined,
          RoomName: undefined,
          BookingStartDate: undefined,
          BookingStartTime: undefined,
          BookingEndTime: undefined
        }
      ];

      this.content.booking.tempTable = [{}];

      axios
        .get(path)
        .then(res => {
          if (res.data.length > 0) {
            for (var bookingIndex in res.data) {
              this.content.booking.table.push({
                BookingId: res.data[bookingIndex].BookingId,
                BookingTitle: res.data[bookingIndex].BookingTitle,
                RoomName: res.data[bookingIndex].RoomName,
                BookingStartDate: dateFormat(
                  res.data[bookingIndex].BookingStartDate,
                  "dd/mm/yyyy"
                ),
                BookingStartTime: dateFormat(
                  res.data[bookingIndex].BookingStartDate,
                  "HH:MM"
                ),
                BookingEndTime: dateFormat(
                  res.data[bookingIndex].BookingEndDate,
                  "HH:MM"
                )
              });

              this.content.booking.tempTable.push({
                BookingId: res.data[bookingIndex].BookingId,
                BookingTitle: res.data[bookingIndex].BookingTitle,
                RoomName: res.data[bookingIndex].RoomName,
                BookingStartDate: res.data[bookingIndex].BookingStartDate,
                BookingEndDate: res.data[bookingIndex].BookingEndDate
              });
            }
          } else {
            this.content.booking.table = [];
            this.content.text.message = res.data.message;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBookingByBookingId(bookingId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/" +
        bookingId;

      var dateFormat = require("dateformat");
      this.content.modal.edit_booking.form.currentDate = new Date();
      this.content.modal.edit_booking.form.currentDate = dateFormat(
        this.content.modal.edit_booking.form.currentDate,
        "yyyy-mm-dd"
      );

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            this.content.modal.edit_booking.form.readonly.BookingId =
              res.data[0].BookingId;
            this.content.modal.edit_booking.form.readonly.RoomId =
              res.data[0].RoomId;
            this.content.modal.edit_booking.form.readonly.RoomName =
              res.data[0].RoomName;
            this.content.modal.edit_booking.form.BookingTitle =
              res.data[0].BookingTitle;
            this.content.modal.edit_booking.form.BookingDetail =
              res.data[0].BookingDetail;
            this.content.modal.edit_booking.form.BookingAttendees =
              res.data[0].BookingAttendees;
            this.content.modal.edit_booking.form.BookingStartDate = dateFormat(
              res.data[0].BookingStartDate,
              "yyyy-mm-dd"
            );
            this.content.modal.edit_booking.form.BookingStartTime = dateFormat(
              res.data[0].BookingStartDate,
              "HH:MM"
            );
            this.content.modal.edit_booking.form.BookingEndTime = dateFormat(
              res.data[0].BookingEndDate,
              "HH:MM"
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    preSendEditBooking() {
      if (
        this.content.modal.edit_booking.form.BookingTitle == null ||
        this.content.modal.edit_booking.form.BookingDetail == null ||
        this.content.modal.edit_booking.form.BookingStartDate == null ||
        this.content.modal.edit_booking.form.BookingStartTime == null ||
        this.content.modal.edit_booking.form.BookingEndTime == null ||
        this.content.modal.edit_booking.form.BookingAttendees == null
      ) {
        this.content.text.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
        document
          .getElementById("booking-schedule-title")
          .scrollIntoView({ behavior: "smooth" });
      } else {
        const results = {
          BookingId: this.content.modal.edit_booking.form.readonly.BookingId,
          BookingTitle: this.content.modal.edit_booking.form.BookingTitle,
          BookingDetail: this.content.modal.edit_booking.form.BookingDetail,
          BookingStartDate: this.content.modal.edit_booking.form
            .BookingStartDate,
          BookingStartTime: this.content.modal.edit_booking.form
            .BookingStartTime,
          BookingEndTime: this.content.modal.edit_booking.form.BookingEndTime,
          BookingAttendees: this.content.modal.edit_booking.form
            .BookingAttendees,
          RoomId: this.content.modal.edit_booking.form.readonly.RoomId
        };

        this.SendEditBooking(results);
      }
    },
    SendEditBooking(results) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/update";

      const headers = {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token"))
      };

      axios
        .put(path, JSON.stringify(results), { headers: headers })
        .then(res => {
          let response = res.data;
          if (response.error_message) {
            this.content.text.message = response.error_message;
            document
              .getElementById("booking-schedule-title")
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
            } else {
              this.content.text.message = null;
              this.$swal(response.message, null, "success");
              $("#edit-booking-modal").modal("hide");
              this.content.booking.table = [
                {
                  BookingId: undefined,
                  BookingTitle: undefined,
                  RoomName: undefined,
                  BookingStartDate: undefined,
                  BookingStartTime: undefined,
                  BookingEndTime: undefined
                }
              ];
              this.getBookingByUserId(
                JSON.parse(localStorage.getItem("user")).id
              );
            }
          }
        })
        .catch(error => {
          console.log(error);
          this.alert = true;
        });
    },
    preSendCancelBooking(bookingId) {
      this.$swal({
        title: "คุณแน่ใจหรือไม่ที่ต้องการจะยกเลิกการจอง ?",
        text: "คุณจะไม่สามารถยกเลิกการกระทำของคุณได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          const payload = {
            BookingId: bookingId
          };
          this.SenCancelBooking(payload);
        } else {
          this.$swal("ยกเลิก", "รายการจองของคุณยังเหมือนเดิม", "info");
        }
      });
    },
    SenCancelBooking(payload) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/cancel";

      const headers = {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token"))
      };

      axios
        .put(path, JSON.stringify(payload), { headers: headers })
        .then(res => {
          if (res.data.isTokenValid) {
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
          } else if (res.data.isCancel) {
            this.$swal("ยกเลิกการจอง", res.data.message, "success");
            this.content.booking.table = [
              {
                BookingId: undefined,
                BookingTitle: undefined,
                RoomName: undefined,
                BookingStartDate: undefined,
                BookingStartTime: undefined,
                BookingEndTime: undefined
              }
            ];
            this.getBookingByUserId(
              JSON.parse(localStorage.getItem("user")).id
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.$swal(
            "เกิดข้อผิดพลาด",
            "ไม่สามารถทำรายการได้ เนื่องจากเกิดความผิดพลาดของระบบ",
            "warning"
          );
        });
    },
    getAllRoomName() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/room/all";

      this.content.filter.table.room = [];

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var index in res.data) {
              this.content.filter.table.room.push({
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onFilter() {
      let dateFormat = require("dateformat");
      let roomName = this.content.filter.room;
      let startDate =
        this.content.filter.startDate != null
          ? dateFormat(this.content.filter.startDate, "yyyy-mm-dd")
          : null;
      let endDate =
        this.content.filter.endDate != null
          ? dateFormat(this.content.filter.endDate, "yyyy-mm-dd")
          : null;

      this.content.booking.table = [{}];

      if (roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null) {
        for (var index in this.content.booking.tempTable) {
          if (this.content.booking.tempTable[index].RoomName == roomName) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null) {
        for (var index in this.content.booking.tempTable) {
          if (Date.parse(this.content.booking.tempTable[index].BookingStartDate) >= Date.parse(startDate)) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null) {
        for (var index in this.content.booking.tempTable) {
          if (Date.parse(this.content.booking.tempTable[index].BookingEndDate) <= Date.parse(endDate)) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null) {
        for (var index in this.content.booking.tempTable) {
          if (this.content.booking.tempTable[index].RoomName == roomName && Date.parse(this.content.booking.tempTable[index].BookingStartDate) >= Date.parse(startDate)) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null) {
        for (var index in this.content.booking.tempTable) {
          if (this.content.booking.tempTable[index].RoomName == roomName && Date.parse(this.content.booking.tempTable[index].BookingEndDate) <= Date.parse(endDate)) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null) {
        for (var index in this.content.booking.tempTable) {
          if (Date.parse(this.content.booking.tempTable[index].BookingStartDate) >= Date.parse(startDate) && Date.parse(this.content.booking.tempTable[index].BookingEndDate) <= Date.parse(endDate)) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      } else if (roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null) {
        for (var index in this.content.booking.tempTable) {
          if (this.content.booking.tempTable[index].RoomName == roomName && (Date.parse(this.content.booking.tempTable[index].BookingStartDate) >= Date.parse(startDate) && Date.parse(this.content.booking.tempTable[index].BookingEndDate) <= Date.parse(endDate))) {
            this.content.booking.table.push({
              BookingId: this.content.booking.tempTable[index].BookingId,
              BookingTitle: this.content.booking.tempTable[index].BookingTitle,
              RoomName: this.content.booking.tempTable[index].RoomName,
              BookingStartDate: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "dd/mm/yyyy"
              ),
              BookingStartTime: dateFormat(
                this.content.booking.tempTable[index].BookingStartDate,
                "HH:MM"
              ),
              BookingEndTime: dateFormat(
                this.content.booking.tempTable[index].BookingEndDate,
                "HH:MM"
              )
            });
          }
        }
      }
    }
  }
};
</script>