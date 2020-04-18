<template>
  <div id="manage-user" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 pt-4 mb-2">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <div class="row mb-4">
                        <div class="col-md-12">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ค้นหารหัสผู้ใช้งาน"
                            v-model="content.table.user.search"
                            @keyup="onSearch()"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive" v-if="content.table.user.body.length > 1">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">{{ content.text.table.user.thead_no0 }}</th>
                                  <th scope="col">{{ content.text.table.user.thead_no1 }}</th>
                                  <th scope="col">{{ content.text.table.user.thead_no2 }}</th>
                                  <th scope="col">{{ content.text.table.user.thead_no3 }}</th>
                                  <th scope="col">{{ content.text.table.user.thead_no4 }}</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody
                                v-for="index in content.table.user.rowPerPages"
                                v-bind:key="index"
                              >
                                <tr
                                  v-if="index + content.table.user.startRow < content.table.user.body.length"
                                >
                                  <th scope="row">{{ index + content.table.user.startRow }}</th>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].UserId }}</td>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].Fullname }}</td>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].BannedDate }}</td>
                                  <td
                                    v-if="content.table.user.body[index + content.table.user.startRow].BannedStatus == 0"
                                  >
                                    {{ content.text.status.unban }}
                                  </td>
                                  <td v-else>
                                    {{ content.text.status.ban }}
                                  </td>
                                  <td
                                    v-if="content.table.user.body[index + content.table.user.startRow].BannedStatus == 0"
                                  >
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-danger"
                                      @click="preSendBanned(content.table.user.body[index + content.table.user.startRow].UserId)"
                                    >
                                      <i class="fa fa-lock"></i>
                                    </button>
                                  </td>
                                  <td v-else>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-success"
                                      @click="preSendUnBanned(content.table.user.body[index + content.table.user.startRow].UserId)"
                                    >
                                      <i class="fa fa-unlock"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="content.table.user.body.length === 0 || content.table.user.body.length === 1">
                        <div class="col-md-12">
                          {{ content.table.user.messageNotFoundUser }}
                        </div>
                      </div>
                      <div class="row" v-if="content.table.user.body.length > 1">
                        <div class="col-md-12">
                          <nav>
                            <ul class="pagination justify-content-center">
                              <div
                                v-for="page in Math.ceil(content.table.user.body.length / content.table.user.rowPerPages)"
                                v-bind:key="page"
                              >
                                <li
                                  class="page-item active"
                                  v-if="page === content.table.user.currentPage"
                                >
                                  <button class="page-link" @click="onPageChange(page)">{{ page }}</button>
                                </li>
                                <li class="page-item" v-else>
                                  <button class="page-link" @click="onPageChange(page)">{{ page }}</button>
                                </li>
                              </div>
                            </ul>
                          </nav>
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
</template>

<script>
import Navbar from "@/components/Navbar";

import axios from "axios";
const axiosConfig = require("../../assets/config.json");

const HOST = axiosConfig.APIGATEWAY.HOST;
const PORT = axiosConfig.APIGATEWAY.PORT;
const API = "http://" + HOST + ":" + PORT

export default {
  name: "ManageUser",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getUser();
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการผู้ใช้งาน",
          table: {
            user: {
              thead_no0: "#",
              thead_no1: "รหัสผู้ใช้งาน",
              thead_no2: "ชื่อ - นามสกุล",
              thead_no3: "สถานะการใช้งาน",
              thead_no4: "จำกัดสิทธิ์เมื่อ"
            }
          },
          status: {
            ban: "ถูกจำกัดสิทธิ์การใช้งาน",
            unban: "ไม่ถูกจำกัดสิทธิ์การใช้งาน"
          }
        },
        table: {
          user: {
            body: [{}],
            tempBody: [{}],
            startRow: 0,
            rowPerPages: 10,
            currentPage: 0,
            search: null,
            messageNotFoundUser: "ไม่พบผู้ใช้งาน"
          }
        }
      }
    };
  },
  methods: {
    getUser() {
      const path = API + "/api/auth/user/all";

      var dateFormat = require("dateformat");
      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      this.content.table.user.body = [{}];
      this.content.table.user.tempBody = [
        {
          UserId: null
        }
      ];

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            for (var index in res.data.results) {
              if (res.data.results[index].Role != "Admin") {
                this.content.table.user.body.push({
                  UserId: res.data.results[index].UserId,
                  Fullname: res.data.results[index].Fullname,
                  Email: res.data.results[index].Email,
                  BannedStatus: res.data.results[index].BannedStatus,
                  BannedDate:
                    res.data.results[index].BannedDate == null
                      ? "-"
                      : dateFormat(
                          res.data.results[index].BannedDate,
                          "dd/mm/yyyy HH:mm"
                        )
                });

                this.content.table.user.tempBody.push({
                  UserId: res.data.results[index].UserId,
                  Fullname: res.data.results[index].Fullname,
                  Email: res.data.results[index].Email,
                  BannedStatus: res.data.results[index].BannedStatus,
                  BannedDate:
                    res.data.results[index].BannedDate == null
                      ? "-"
                      : dateFormat(
                          res.data.results[index].BannedDate,
                          "dd/mm/yyyy HH:mm"
                        )
                });
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    preSendBanned(userId) {
      this.$swal({
        title:
          "คุณแน่ใจหรือไม่ที่ต้องการจะจำกัดสิทธิ์การเข้าใช้งานของ " +
          userId +
          " ?",
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
          this.SendBanned(userId);
        } else {
          this.$swal(
            "ยกเลิก",
            "สิทธิ์การใช้งานของ " + userId + " ยังคงเหมือนเดิม",
            "info"
          );
        }
      });
    },
    SendBanned(userId) {
      const path = API + "/api/auth/user/ban";

      let payload = {
        UserId: userId,
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            this.$swal("", res.data.message, "success");
            this.getUser();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    preSendUnBanned(userId) {
      this.$swal({
        title:
          "คุณแน่ใจหรือไม่ที่ต้องการจะยกเลิกจำกัดสิทธิ์การเข้าใช้งานของ " +
          userId +
          " ?",
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
          this.SendUnBanned(userId);
        } else {
          this.$swal(
            "ยกเลิก",
            userId + " ยังคงถูกจำกัดสิทธิ์การใช้งานเหมือนเดิม",
            "info"
          );
        }
      });
    },
    SendUnBanned(userId) {
      const path = API + "/api/auth/user/unban";

      let payload = {
        UserId: userId,
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            this.$swal("", res.data.message, "success");
            this.getUser();
            this.content.table.user.search = null
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSearch() {
      let searchText = this.content.table.user.search.trim();

      this.content.table.user.body = [{}];

      if (searchText == null || searchText == "") {
        this.getUser();
      } else {
        for (
          var index = 1;
          index < this.content.table.user.tempBody.length;
          index++
        ) {
          let searchFound = this.content.table.user.tempBody[
            index
          ].UserId.indexOf(searchText);
          if (searchFound > -1) {
            this.content.table.user.body.push(
              this.content.table.user.tempBody[index]
            );
          }
        }
      }
    },
    onPageChange(page) {
      this.content.report.currentPage = page;
      this.content.report.startRow =
        this.content.report.rowPerPages * (page - 1);
    }
  }
};
</script>