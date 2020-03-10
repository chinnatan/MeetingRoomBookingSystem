<template>
  <div id="manage-report-room" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 p-3">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
              <small>{{ content.text.title_description }}</small>
            </div>
          </div>
          <div class="row">
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
                            <select class="form-control" id="select-room">
                              <option
                                value="none"
                                selected
                                disabled
                                hidden
                              >{{ content.text.filter.option.default_select_room }}</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              for="select-start-date"
                            >{{ content.text.filter.select_start_date_label }}</label>
                            <input type="date" class="form-control" id="select-start-date" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              for="select-end-date"
                            >{{ content.text.filter.select_end_date_label }}</label>
                            <input type="date" class="form-control" id="select-end-date" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row">
                    <div
                      class="col-md-12"
                      v-if="content.report.table.length === 0"
                    >{{ content.text.report.message }}</div>
                  </div>
                  <div class="row" v-if="content.report.table.length !== 0">
                    <div class="col-md-12">
                      <h5 class="card-title">{{ content.text.report.title }}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive" v-if="content.report.table.length !== 0">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">{{ content.text.report.table.thead_no0 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no1 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no2 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no3 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no4 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no5 }}</th>
                            </tr>
                          </thead>
                          <tbody v-for="index in content.report.rowPerPages" v-bind:key="index">
                            <tr
                              v-if="index + content.report.startRow < content.report.table.length"
                            >
                              <th scope="row">{{ index + content.report.startRow }}</th>
                              <td>{{ content.report.table[index + content.report.startRow].BookingTitle }}</td>
                              <td>{{ content.report.table[index + content.report.startRow].RoomName }}</td>
                              <td>{{ content.report.table[index + content.report.startRow].BookingDate }}</td>
                              <td>{{ content.report.table[index + content.report.startRow].Fullname }}</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].BookingStatus === 'B'"
                              >ยังไม่ได้ใช้งาน</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].BookingStatus === 'C'"
                              >ยกเลิก</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].BookingStatus === 'U'"
                              >ใช้งาน</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="content.report.table.length !== 0">
                    <div class="col-md-12">
                      <nav>
                        <ul class="pagination justify-content-center">
                          <div
                            v-for="page in Math.ceil(content.report.table.length / content.report.rowPerPages)"
                            v-bind:key="page"
                          >
                            <li class="page-item active" v-if="page === content.report.currentPage">
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
          <div class="row mt-2 mb-5">
            <div class="col-md-12">
              <button type="button" class="btn btn-outline-variasi-warna col-md-12">
                {{ button.print_report }}
                <i class="fa fa-print"></i>
              </button>
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
const axiosConfig = require("../../../assets/config.json");

export default {
  name: "ManageReportRoom",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getSummaryBooking();
    this.onPageChange(1);
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการรายงาน",
          title_description: "สำหรับจัดการรายงานสรุปการใช้งานของแต่ละห้อง",
          filter: {
            title: "กรองข้อมูลตาม",
            select_room_label: "เลือกห้องที่ต้องการ",
            select_start_date_label: "เลือกวันที่ต้องการเริ่มต้น",
            select_end_date_label: "เลือกวันที่ต้องการสิ้นสุด",
            option: {
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--"
            }
          },
          report: {
            title: "รายงานสรุปการใช้งานห้อง",
            table: {
              thead_no0: "#",
              thead_no1: "หัวข้อการจอง",
              thead_no2: "ชื่อห้อง",
              thead_no3: "จองเมื่อวันที่",
              thead_no4: "ชื่อผู้จอง",
              thead_no5: "สถานะ"
            },
            message: "ไม่พบข้อมูลการใช้งาน"
          }
        },
        report: {
          table: [],
          startRow: 0,
          rowPerPages: 10,
          currentPage: 0,
        }
      },
      button: {
        print_report: "พิมพ์รายงาน"
      }
    };
  },
  methods: {
    getSummaryBooking() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/booking/admin/summary";

      var dateFormat = require("dateformat");
      this.content.report.table = [];

      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      axios
        .post(path, payload)
        .then(res => {
          if (res.data) {
            for (var summaryIndex in res.data) {
              this.content.report.table.push({
                BookingTitle: res.data[summaryIndex].BookingTitle,
                RoomName: res.data[summaryIndex].RoomName,
                BookingDate: dateFormat(
                  res.data[summaryIndex].BookingDate,
                  "dd/mm/yyyy"
                ),
                Fullname: res.data[summaryIndex].Fullname,
                BookingStatus: res.data[summaryIndex].BookingStatus
              });
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