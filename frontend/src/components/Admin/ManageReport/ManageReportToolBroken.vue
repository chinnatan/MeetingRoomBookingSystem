<template>
  <div id="manage-report-tool-broken" class="h-100">
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
                            <select class="form-control" v-model="content.filter.room" @change="onFilter()">
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
                            <input type="date" class="form-control" v-model="content.filter.startDate" @change="onFilter()" />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label
                              for="select-end-date"
                            >{{ content.text.filter.select_end_date_label }}</label>
                            <input type="date" class="form-control" v-model="content.filter.endDate" @change="onFilter()"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label
                              for="select-status-date"
                            >{{ content.text.filter.select_status_label }}</label>
                            <select class="form-control" v-model="content.filter.reportStatus" @change="onFilter()">
                              <option
                                :value="content.filter.reportStatus"
                                selected
                                disabled
                                hidden
                              >{{ content.filter.reportStatus }}</option>
                              <option :value="content.text.report.status.acknowledge">{{ content.text.report.status.acknowledge }}</option>
                              <option :value="content.text.report.status.inprocess">{{ content.text.report.status.inprocess }}</option>
                              <option :value="content.text.report.status.completed">{{ content.text.report.status.completed }}</option>
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
                  <div id="reportToolPrint">
                    <div class="row">
                      <div class="col-md-12" v-if="content.report.table.length > 1">
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
                                <th scope="col">{{ content.text.report.table.thead_no6 }}</th>
                              </tr>
                            </thead>
                            <tbody v-for="index in content.report.rowPerPages" v-bind:key="index">
                              <tr
                                v-if="index + content.report.startRow < content.report.table.length"
                              >
                                <th scope="row">{{ index + content.report.startRow }}</th>
                                <td>{{ content.report.table[index + content.report.startRow].ToolName }}</td>
                                <td>{{ content.report.table[index + content.report.startRow].RoomName }}</td>
                                <td>{{ content.report.table[index + content.report.startRow].ReportDate }}</td>
                                <td>{{ content.report.table[index + content.report.startRow].Fullname }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].ToolStatus === 0"
                                >{{ content.text.report.status.tool.noavailable }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].ToolStatus === 1"
                                >{{ content.text.report.status.tool.available }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].ReportStatus === 'A'"
                                >{{ content.text.report.status.acknowledge }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].ReportStatus === 'IN'"
                                >{{ content.text.report.status.inprocess }}</td>
                                <td
                                  v-if="content.report.table[index + content.report.startRow].ReportStatus === 'C'"
                                >{{ content.text.report.status.completed }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="content.report.table.length > 1">
                    <div class="col-md-12">
                      <nav aria-label="...">
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
                v-print="'#reportToolPrint'"
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
  name: "ManageReportToolBroken",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getSummaryReportTool();
    this.getAllRoomName();
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการรายงาน",
          title_description: "สำหรับจัดการรายงานสรุปการแจ้งอุปกรณ์เสียหาย",
          filter: {
            title: "กรองข้อมูลตาม",
            select_room_label: "เลือกห้องที่ต้องการ",
            select_start_date_label: "เลือกวันที่ต้องการเริ่มต้น",
            select_end_date_label: "เลือกวันที่ต้องการสิ้นสุด",
            select_status_label: "เลือกสถานะรายงานที่ต้องการ",
            option: {
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--"
            }
          },
          report: {
            title: "รายงานสรุปการแจ้งอุปกรณ์เสียหาย",
            table: {
              thead_no0: "#",
              thead_no1: "ชื่ออุปกรณ์",
              thead_no2: "ชื่อห้อง",
              thead_no3: "วันที่แจ้งความเสียหาย",
              thead_no4: "ชื่อผู้แจ้ง",
              thead_no5: "สถานะของอุปกรณ์",
              thead_no6: "สถานะของรายงาน"
            },
            message: "ไม่พบรายงานสรุปอุปกรณ์เสียหาย",
            status: {
              acknowledge: "แจ้งปัญหาเรียบร้อย",
              inprocess: "กำลังดำเนินการแก้ไขปัญหา",
              completed: "แก้ไขปัญหาเรียบร้อย",
              tool: {
                available: "ใช้งานได้",
                noavailable: "ใช้งานไม่ได้"
              }
            }
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
          reportStatus: "--กรุณาเลือกสถานะที่ต้องการ--"
        }
      },
      button: {
        print_report: "พิมพ์รายงาน"
      }
    };
  },
  methods: {
    getSummaryReportTool() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/admin/summary";

      var dateFormat = require("dateformat");
      this.content.report.table = [{}];
      this.content.filter.table.room = [{}]

      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      axios
        .post(path, payload)
        .then(res => {
          if (res.data) {
            for (var summaryIndex in res.data) {
              this.content.report.table.push({
                ToolName: res.data[summaryIndex].ToolName,
                RoomName: res.data[summaryIndex].RoomName,
                ReportDate: dateFormat(
                  res.data[summaryIndex].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: res.data[summaryIndex].Fullname,
                ToolStatus: res.data[summaryIndex].ToolStatus,
                ReportStatus: res.data[summaryIndex].ReportStatus
              });

              this.content.report.tempTable.push({
                ToolName: res.data[summaryIndex].ToolName,
                RoomName: res.data[summaryIndex].RoomName,
                ReportDate: res.data[summaryIndex].ReportDate,
                Fullname: res.data[summaryIndex].Fullname,
                ToolStatus: res.data[summaryIndex].ToolStatus,
                ReportStatus: res.data[summaryIndex].ReportStatus
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
      let dateFormat = require("dateformat");
      let roomName = this.content.filter.room
      let startDate = this.content.filter.startDate != null
          ? dateFormat(this.content.filter.startDate, "yyyy-mm-dd")
          : null;
      let endDate = this.content.filter.endDate != null
          ? dateFormat(this.content.filter.endDate, "yyyy-mm-dd")
          : null;
      let reportStatus = null

      if(this.content.filter.reportStatus == this.content.text.report.status.acknowledge) {
        reportStatus = "A"
      } else if(this.content.filter.reportStatus == this.content.text.report.status.inprocess) {
        reportStatus = "IN"
      } else if(this.content.filter.reportStatus == this.content.text.report.status.completed) {
        reportStatus = "C"
      }

      this.content.report.table = [{}]

      if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (Date.parse(this.content.report.tempTable[index].ReportDate) >= Date.parse(startDate)) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (Date.parse(this.content.report.tempTable[index].ReportDate) <= Date.parse(endDate)) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName == "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && reportStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].ReportStatus == reportStatus) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].ReportDate) >= Date.parse(startDate)) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].ReportDate) <= Date.parse(endDate)) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate == null && reportStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && this.content.report.tempTable[index].ReportStatus == reportStatus) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null && reportStatus == null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && (Date.parse(this.content.report.tempTable[index].ReportDate) >= Date.parse(startDate) && Date.parse(this.content.report.tempTable[index].ReportDate) <= Date.parse(endDate))) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate == null && reportStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].ReportDate) >= Date.parse(startDate) && this.content.report.tempTable[index].ReportStatus == reportStatus) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate == null && endDate != null && reportStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && Date.parse(this.content.report.tempTable[index].ReportDate) <= Date.parse(endDate) && this.content.report.tempTable[index].ReportStatus == reportStatus) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
              });
          }
        }
      } else if(roomName != "--กรุณาเลือกห้องที่ต้องการ--" && startDate != null && endDate != null && reportStatus != null) {
        for (var index in this.content.report.tempTable) {
          if (this.content.report.tempTable[index].RoomName == roomName && (Date.parse(this.content.report.tempTable[index].ReportDate) >= Date.parse(startDate) && Date.parse(this.content.report.tempTable[index].ReportDate) <= Date.parse(endDate)) && this.content.report.tempTable[index].ReportStatus == reportStatus) {
            this.content.report.table.push({
                ToolName: this.content.report.tempTable[index].ToolName,
                RoomName: this.content.report.tempTable[index].RoomName,
                ReportDate: dateFormat(
                  this.content.report.tempTable[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                Fullname: this.content.report.tempTable[index].Fullname,
                ToolStatus: this.content.report.tempTable[index].ToolStatus,
                ReportStatus: this.content.report.tempTable[index].ReportStatus
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