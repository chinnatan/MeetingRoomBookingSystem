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
                        <div class="col-md-3">
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
                        <div class="col-md-3">
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
                        <div class="col-md-3">
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
                        <div class="col-md-3">
                          <div class="form-group">
                            <label
                              for="select-status-date"
                            >{{ content.text.filter.select_status_label }}</label>
                            <select class="form-control" v-model="content.filter.bookingStatus" @change="onFilter()">
                              <option
                                :value="content.filter.bookingStatus"
                                selected
                                disabled
                                hidden
                              >{{ content.filter.bookingStatus }}</option>
                              <option :value="content.text.filter.status.booking">{{ content.text.filter.status.booking }}</option>
                              <option :value="content.text.filter.status.cancel">{{ content.text.filter.status.cancel }}</option>
                              <option :value="content.text.filter.status.use">{{ content.text.filter.status.use }}</option>
                            </select>
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
                      v-if="content.report.table.length === 0 || content.report.table.length === 1"
                    >{{ content.text.report.message }}</div>
                  </div>
                  <div id="reportRoomPrint">
                    <div class="row" v-if="content.report.table.length > 1">
                      <div class="col-md-12">
                        <h5 class="card-title">{{ content.text.report.title }}</h5>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive" v-if="content.report.table.length > 1">
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
                                >{{ content.text.filter.status.booking }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].BookingStatus === 'C'"
                                >{{ content.text.filter.status.cancel }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].BookingStatus === 'U'"
                                >{{ content.text.filter.status.use }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="content.report.table.length > 1">
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
          <div class="row mt-2 mb-5" v-if="content.report.table.length > 1">
            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-outline-variasi-warna col-md-12"
                v-print="'#reportRoomPrint'"
              >
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
    this.getAllRoomName();
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
            select_status_label: "เลือกสถานะการใช้งาน",
            option: {
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--"
            },
            status: {
              booking: "ยังไม่ได้ใช้งาน",
              cancel: "ยกเลิก",
              use: "ใช้งาน"
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
          table: [{}],
          tempTable: [{}],
          startRow: 0,
          rowPerPages: 10,
          currentPage: 0
        },
        filter: {
          table: {
            room: []
          },
          room: "--กรุณาเลือกห้องที่ต้องการ--",
          startDate: null,
          endDate: null,
          bookingStatus: "--กรุณาเลือกสถานะที่ต้องการ--"
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
      this.content.report.table = [{}];
      this.content.report.tempTable = [{}];

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

              this.content.report.tempTable.push({
                BookingTitle: res.data[summaryIndex].BookingTitle,
                RoomName: res.data[summaryIndex].RoomName,
                BookingDate: res.data[summaryIndex].BookingDate,
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
      var dateFormat = require("dateformat");
      let roomName = this.content.filter.room;
      let startDate =
        this.content.filter.startDate != null
          ? dateFormat(this.content.filter.startDate, "yyyy-mm-dd")
          : null;
      let endDate =
        this.content.filter.endDate != null
          ? dateFormat(this.content.filter.endDate, "yyyy-mm-dd")
          : null;
      let bookingStatus = null

      if(this.content.filter.bookingStatus == this.content.text.filter.status.booking) {
        bookingStatus = "B"
      } else if(this.content.filter.bookingStatus == this.content.text.filter.status.cancel) {
        bookingStatus = "C"
      } else if(this.content.filter.bookingStatus == this.content.text.filter.status.use) {
        bookingStatus = "U"
      }

      this.content.report.table = [{}];

      if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate)) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate)) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].BookingStatus == bookingStatus && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate)) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate)) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate) && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate)) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if ((Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate) && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate)) && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null && bookingStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && (Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate) && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate))) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate) && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate) && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null && bookingStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && (Date.parse(this.content.report.tempTable[index].BookingDate) >= Date.parse(startDate) && Date.parse(this.content.report.tempTable[index].BookingDate) <= Date.parse(endDate)) && this.content.report.tempTable[index].BookingStatus == bookingStatus) {
            this.content.report.table.push({
              BookingTitle: this.content.report.tempTable[index].BookingTitle,
              RoomName: this.content.report.tempTable[index].RoomName,
              BookingDate: dateFormat(
                this.content.report.tempTable[index].BookingDate,
                "dd/mm/yyyy"
              ),
              Fullname: this.content.report.tempTable[index].Fullname,
              BookingStatus: this.content.report.tempTable[index].BookingStatus
            });
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