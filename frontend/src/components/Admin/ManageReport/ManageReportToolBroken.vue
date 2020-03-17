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
                  <div id="reportToolPrint">
                    <div class="row">
                      <div class="col-md-12" v-if="content.report.table.length !== 0">
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
                                <td>{{ content.report.table[index + content.report.startRow].ToolName }}</td>
                                <td>{{ content.report.table[index + content.report.startRow].RoomName }}</td>
                                <td>{{ content.report.table[index + content.report.startRow].ReportDate }}</td>
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
                  <div class="row">
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
          <div class="row mt-2 mb-5">
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
              thead_no4: "สถานะของอุปกรณ์",
              thead_no5: "สถานะของรายงาน"
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
          startRow: 0,
          rowPerPages: 10,
          currentPage: 0
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
    onPageChange(page) {
      this.content.report.currentPage = page;
      this.content.report.startRow =
        this.content.report.rowPerPages * (page - 1);
    }
  }
};
</script>