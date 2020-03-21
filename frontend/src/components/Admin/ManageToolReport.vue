<template>
  <div id="manage-tool-report" class="h-100">
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
                        <div
                          class="col-md-12"
                          v-if="content.table.tool_report.body.length <= 1"
                        >{{ content.text.table.tool_report.no_data }}</div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="table-responsive"
                            v-if="content.table.tool_report.body.length > 1"
                          >
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no0 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no1 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no2 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no3 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no4 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no5 }}</th>
                                  <th scope="col">{{ content.text.table.tool_report.thead_no6 }}</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody
                                v-for="index in content.table.tool_report.rowPerPages"
                                v-bind:key="index"
                              >
                                <tr
                                  v-if="index + content.table.tool_report.startRow < content.table.tool_report.body.length"
                                >
                                  <th scope="row">{{ index + content.table.tool_report.startRow }}</th>
                                  <td>{{ content.table.tool_report.body[index + content.table.tool_report.startRow].BookingTitle }}</td>
                                  <td>{{ content.table.tool_report.body[index + content.table.tool_report.startRow].ToolName }}</td>
                                  <td>{{ content.table.tool_report.body[index + content.table.tool_report.startRow].RoomName }}</td>
                                  <td>{{ content.table.tool_report.body[index + content.table.tool_report.startRow].Fullname }}</td>
                                  <td>{{ content.table.tool_report.body[index + content.table.tool_report.startRow].ReportDate }}</td>
                                  <td
                                    v-if="content.table.tool_report.body[index + content.table.tool_report.startRow].ReportStatus === 'A'"
                                  >{{ content.text.table.tool_report.status.acknowledge }}</td>
                                  <td
                                    v-if="content.table.tool_report.body[index + content.table.tool_report.startRow].ReportStatus === 'IN'"
                                  >{{ content.text.table.tool_report.status.inprocess }}</td>
                                  <td
                                    v-if="content.table.tool_report.body[index + content.table.tool_report.startRow].ReportStatus === 'C'"
                                  >{{ content.text.table.tool_report.status.completed }}</td>
                                  <td>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-info"
                                      data-toggle="modal"
                                      data-target="#report-status-modal"
                                      @click="onUpdateReportStatus(content.table.tool_report.body[index + content.table.tool_report.startRow].ReportId)"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="content.table.tool_report.body.length > 1">
                        <div class="col-md-12">
                          <nav>
                            <ul class="pagination justify-content-center">
                              <div
                                v-for="page in Math.ceil(content.table.tool_report.body.length / content.table.tool_report.rowPerPages)"
                                v-bind:key="page"
                              >
                                <li
                                  class="page-item active"
                                  v-if="page === content.table.tool_report.currentPage"
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

    <!-- Modal -->
    <div
      class="modal fade text-left"
      id="report-status-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title font-color-primary"
              id="report-title"
            >{{ content.modal.report_status.title }} (หมายเลขรายงาน {{ content.modal.report_status.reportId }})</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="preUpdateReportStatus">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="alert alert-danger"
                    v-if="content.modal.report_status.messageAlert"
                    role="alert"
                  >{{ content.modal.report_status.messageAlert }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="status"
                        v-model="content.modal.report_status.radio.status"
                        value="IN"
                      />
                      {{ content.text.table.tool_report.status.inprocess }}
                    </label>
                  </div>
                  <div class="form-check mt-4">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="status"
                        v-model="content.modal.report_status.radio.status"
                        value="C"
                      />
                      {{ content.text.table.tool_report.status.completed }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">ยกเลิก</button>
              <button type="submit" class="btn btn-sm btn-success">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import axios from "axios";
const axiosConfig = require("../../assets/config.json");

export default {
  name: "ManageToolReport",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getToolReport();
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการรายงานการแจ้งอุปกรณ์เสียหาย",
          table: {
            tool_report: {
              thead_no0: "#",
              thead_no1: "หัวข้อการจอง",
              thead_no2: "ชื่ออุปกรณ์",
              thead_no3: "ชื่อห้อง",
              thead_no4: "ชื่อผู้แจ้ง",
              thead_no5: "แจ้งปัญหาวันที่",
              thead_no6: "สถานะของรายงาน",
              status: {
                acknowledge: "แจ้งปัญหาเรียบร้อย",
                inprocess: "กำลังดำเนินการแก้ไขปัญหา",
                completed: "แก้ไขปัญหาเรียบร้อย"
              },
              no_data: "ไม่พบรายการการแจ้งปัญหาอุปกรณ์เสียหาย"
            }
          }
        },
        table: {
          tool_report: {
            body: [{}],
            startRow: 0,
            rowPerPages: 10,
            currentPage: 0
          }
        },
        modal: {
          report_status: {
            reportId: null,
            title: "เปลี่ยนแปลงสถานะรายงาน",
            radio: {
              status: null
            },
            messageAlert: null
          }
        }
      }
    };
  },
  methods: {
    getToolReport() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/all";

      var dateFormat = require("dateformat");
      let payload = {
        isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin
      };

      this.content.table.tool_report.body = [{}];

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            for (var index in res.data.results) {
              this.content.table.tool_report.body.push({
                ReportId: res.data.results[index].ReportId,
                BookingTitle: res.data.results[index].BookingTitle,
                ToolName: res.data.results[index].ToolName,
                RoomName: res.data.results[index].RoomName,
                Fullname: res.data.results[index].Fullname,
                ReportDate: dateFormat(
                  res.data.results[index].ReportDate,
                  "dd/mm/yyyy"
                ),
                ReportStatus: res.data.results[index].ReportStatus
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onUpdateReportStatus(reportId) {
      this.content.modal.report_status.reportId = reportId;
      this.content.modal.report_status.messageAlert = null;

      for (var index in this.content.table.tool_report.body) {
        if (this.content.table.tool_report.body[index].ReportId == reportId) {
          this.content.modal.report_status.radio.status = this.content.table.tool_report.body[
            index
          ].ReportStatus;
        }
      }
    },
    preUpdateReportStatus() {
      if (
        this.content.modal.report_status.radio.status == null ||
        this.content.modal.report_status.radio.status == "A"
      ) {
        this.content.modal.report_status.messageAlert =
          "กรุณาระบุสถานะที่ต้องการเปลี่ยนแปลง";
      } else {
        this.content.modal.report_status.messageAlert = null;

        let payload = {
          isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin,
          ReportId: this.content.modal.report_status.reportId,
          ReportStatus: this.content.modal.report_status.radio.status
        };

        this.updateReportStatus(payload);
      }
    },
    updateReportStatus(payload) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/report/update";

      axios
        .post(path, payload)
        .then(res => {
          if (!res.data.isError) {
            this.$swal("บันทึก", res.data.message, "success");
            $("#report-status-modal").modal("hide");
            this.getToolReport()
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onPageChange(page) {
      this.content.table.tool_report.currentPage = page;
      this.content.table.tool_report.startRow =
        this.content.table.tool_report.rowPerPages * (page - 1);
    }
  }
};
</script>