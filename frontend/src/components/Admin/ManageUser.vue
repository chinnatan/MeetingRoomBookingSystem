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
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody v-for="index in content.table.user.rowPerPages" v-bind:key="index">
                                <tr v-if="index + content.table.user.startRow < content.table.user.body.length">
                                  <th scope="row">{{ index + content.table.user.startRow }}</th>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].UserId }}</td>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].Fullname }}</td>
                                  <td>{{ content.table.user.body[index + content.table.user.startRow].BannedDate }}</td>
                                  <td v-if="content.table.user.body[index + content.table.user.startRow].BannedStatus == 0">
                                    <button type="button" class="btn btn-sm btn-danger">
                                      <i class="fa fa-lock"></i>
                                    </button>
                                  </td>
                                  <td v-else>
                                    <button type="button" class="btn btn-sm btn-success">
                                      <i class="fa fa-unlock"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
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
              thead_no3: "จำกัดสิทธิ์เมื่อ"
            }
          }
        },
        table: {
          user: {
            body: [{}],
            startRow: 0,
            rowPerPages: 10,
            currentPage: 0
          }
        }
      }
    };
  },
  methods: {
    getUser() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/auth/user/all";

      var dateFormat = require("dateformat");
      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

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
                          "dd/mm/yyyy"
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
    onPageChange(page) {
      this.content.report.currentPage = page;
      this.content.report.startRow =
        this.content.report.rowPerPages * (page - 1);
    }
  }
};
</script>