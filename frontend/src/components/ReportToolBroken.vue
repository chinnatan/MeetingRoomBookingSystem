<template>
  <div id="report-tool-broken" class="h-100">
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
          <div class="row">
            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-outline-danger col-md-12"
                data-toggle="modal"
                data-target="#report-problem-modal"
              >{{ button.report_problem_now }}</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-outline-variasi-warna col-md-12"
                data-toggle="modal"
                data-target="#report-problem-modal"
                @click="getRoomNameForReportTool()"
              >{{ button.report_problem }}</button>
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
          <div class="row mt-3 mb-5">
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row">
                    <div
                      class="col-md-12"
                      v-if="content.report.table.length === 0"
                    >{{ content.text.no_data }}</div>
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
                            </tr>
                          </thead>
                          <tbody v-for="index in content.report.rowPerPages" v-bind:key="index">
                            <tr
                              v-if="index + content.report.startRow < content.report.table.length"
                            >
                              <th scope="row">{{ index + content.report.startRow }}</th>
                              <td>{{ content.report.table[index + content.report.startRow].ReportToolName }}</td>
                              <td>{{ content.report.table[index + content.report.startRow].ReportRoomName }}</td>
                              <td>{{ content.report.table[index + content.report.startRow].ReportDate }}</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].ReportStatus === 'A'"
                              >{{ content.text.acknowledge }}</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].ReportStatus === 'IN'"
                              >{{ content.text.inprocess }}</td>
                              <td
                                v-if="content.report.table[index + content.report.startRow].ReportStatus === 'C'"
                              >{{ content.text.completed }}</td>
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
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade text-left"
      id="report-problem-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <form @submit.prevent="preSendReport">
            <div class="modal-header">
              <h5 class="modal-title font-color-primary" id="report-title">{{ modal.text.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="alert alert-danger"
                    v-if="modal.form.alertMessage"
                    role="alert"
                  >{{ modal.form.alertMessage }}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="room-name-select">{{ modal.text.room_name }}</label>
                <select
                  class="form-control"
                  v-model="modal.form.roomNameSelect"
                  @change="getToolNameForReportTool(modal.form.roomNameSelect)"
                  required
                >
                  <option
                    :value="modal.text.option.room_name"
                    selected
                    disabled
                    hidden
                  >{{ modal.text.option.room_name }}</option>
                  <option
                    v-for="(line, index) in modal.form.room_name"
                    v-bind:key="index"
                    :value="line.RoomAccessId"
                  >{{ line.RoomName}} - {{ line.BookingTitle }}</option>
                </select>
                <small
                  id="room-name-select-help"
                  class="form-text text-muted"
                >{{ modal.text.description.room_name }}</small>
              </div>
              <div
                class="row"
                v-if="modal.form.roomNameSelect !== '--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--'"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-sm btn-success" @click="addToolReport()">
                        <i class="fa fa-plus"></i>
                        {{ button.add }}
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        class="row"
                        v-for="(tool, index) in modal.form.toolReport"
                        v-bind:key="index"
                      >
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label
                              for="tool-name-select"
                              class="col-sm-4 col-form-label"
                            >{{ modal.text.tool_name }}</label>
                            <div class="col-sm-8">
                              <select class="form-control" v-model="tool.toolId" required>
                                <option
                                  value="none"
                                  selected
                                  disabled
                                  hidden
                                >{{ modal.text.option.tool_name }}</option>
                                <option
                                  v-for="(toolOption, index) in modal.form.tool_name"
                                  v-bind:key="index"
                                  :value="toolOption.ToolId"
                                >{{ toolOption.ToolName}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label
                              for="tool-name-select"
                              class="col-sm-4 col-form-label"
                            >{{ modal.text.detail_problem }}</label>
                            <div class="col-sm-8">
                              <textarea
                                class="form-control"
                                v-model="tool.detail"
                                rows="1"
                                required
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >{{ button.close }}</button>
              <button
                type="button"
                class="btn btn-danger"
                @click="onResetToolReport()"
              >{{ button.reset }}</button>
              <button type="submit" class="btn btn-success">{{ button.accept }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import axios from "axios";
const axiosConfig = require("../assets/config.json");

export default {
  name: "ReportToolBroken",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getToolReportByUserId(JSON.parse(localStorage.getItem("user")).id);
  },
  data() {
    return {
      content: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          acknowledge: "แจ้งปัญหาเรียบร้อย",
          inprocess: "กำลังดำเนินการแก้ไขปัญหา",
          completed: "แก้ไขปัญหาเรียบร้อย",
          no_data: "ไม่พบข้อมูลการแจ้งปัญหา",
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
            table: {
              thead_no0: "#",
              thead_no1: "ชื่ออุปกรณ์",
              thead_no2: "ชื่อห้อง",
              thead_no3: "แจ้งปัญหาวันที่",
              thead_no4: "สถานะของรายงาน"
            }
          }
        },
        report: {
          table: [],
          startRow: 0,
          rowPerPages: 10,
          currentPage: 0
        }
      },
      button: {
        report_problem: "แจ้งปัญหา",
        report_problem_now: "แจ้งปัญหาแบบทันที",
        close: "ปิด",
        reset: "คืนค่าเริ่มต้น",
        accept: "ยืนยัน",
        add: "เพิ่มอุปกรณ์"
      },
      modal: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          room_name: "ชื่อห้อง - หัวข้อการจอง",
          tool_name: "ชื่ออุปกรณ์",
          detail_problem: "รายละเอียด",
          description: {
            room_name: "แสดงเฉพาะที่ได้ทำการเข้าใช้งานเท่านั้น",
            tool_name: "แสดงเฉพาะอุปกรณ์ที่มีภายในห้องที่เลือกเท่านั้น"
          },
          option: {
            room_name: "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--",
            tool_name: "เลือกอุปกรณ์"
          }
        },
        form: {
          room_name: [],
          tool_name: [],
          roomNameSelect: "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--",
          toolReport: [
            {
              toolId: null,
              detail: ""
            }
          ],
          alertMessage: null
        }
      }
    };
  },
  methods: {
    getToolReportByUserId(userId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/" +
        userId;

      var dateFormat = require("dateformat");
      this.content.report.table = [];

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var index in res.data) {
              this.content.report.table.push({
                ReportId: res.data[index].ReportId,
                ReportToolName: res.data[index].ReportToolName,
                ReportDate: dateFormat(
                  res.data[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                ReportRoomName: res.data[index].ReportRoomName,
                ReportStatus: res.data[index].ReportStatus
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
    },
    getRoomNameForReportTool() {
      let userId = JSON.parse(localStorage.getItem("user")).id;
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/room/name/" +
        userId;

      this.modal.form.toolReport = [
        {
          toolId: null,
          detail: ""
        }
      ];
      this.modal.form.room_name = [];
      this.modal.form.roomNameSelect = "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--";
      this.modal.form.tool_name = [];
      this.modal.form.alertMessage = null;

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var index in res.data) {
              this.modal.form.room_name.push({
                RoomAccessId: res.data[index].RoomAccessId,
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName,
                BookingTitle: res.data[index].BookingTitle
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addToolReport() {
      if (
        this.modal.form.toolReport.length < this.modal.form.tool_name.length
      ) {
        this.modal.form.toolReport.push({
          toolId: null,
          detail: ""
        });
      }
    },
    onResetToolReport() {
      this.modal.form.toolReport = [
        {
          toolId: null,
          detail: ""
        }
      ];
      this.modal.form.roomNameSelect = "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--";
      this.modal.form.tool_name = [];
    },
    getToolNameForReportTool(roomId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/tool/name/" +
        roomId;

      this.modal.form.alertMessage = null;
      this.modal.form.tool_name = [];

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            if (!res.data.isError) {
              for (var index in res.data) {
                this.modal.form.tool_name.push({
                  ToolId: res.data[index].ToolId,
                  ToolName: res.data[index].ToolName
                });
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    preSendReport() {
      if (
        this.modal.form.roomNameSelect == null ||
        this.modal.form.roomNameSelect == "" ||
        this.modal.form.roomNameSelect ==
          "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--"
      ) {
        this.modal.form.alertMessage = "กรุณาเลือกห้องที่ต้องการแจ้งปัญหา";
      }

      if (this.modal.form.toolReport.length > 0) {
        for (var index in this.modal.form.toolReport) {
          if (
            this.modal.form.toolReport[index].toolId == null ||
            this.modal.form.toolReport[index].toolId == "" ||
            this.modal.form.toolReport[index].detail == null ||
            this.modal.form.toolReport[index].detail == ""
          ) {
            this.modal.form.alertMessage = "กรุณากรอกรายละเอียดให้ครบถ้วน";
          }
        }
      }

      let payload = {
        RoomAccessId: this.modal.form.roomNameSelect,
        ToolProblem: JSON.stringify(this.modal.form.toolReport)
      };

      this.SendReport(payload);
    },
    SendReport(request) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/send";

      axios
        .post(path, JSON.stringify(request))
        .then(res => {
          let response = res.data;
          if (response.isError) {
            this.modal.form.alertMessage = response.message;
          } else {
            this.$swal(response.message, "", "success");
            $("#report-problem-modal").modal("hide");
            this.onResetToolReport();
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
.accordion .card .card-header {
  cursor: pointer;
}
</style>