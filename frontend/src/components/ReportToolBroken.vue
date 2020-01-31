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
                            <label for="select-start-date">{{ content.text.filter.select_start_date_label }}</label>
                            <input type="date" class="form-control" id="select-start-date" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="select-end-date">{{ content.text.filter.select_end_date_label }}</label>
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
                    <div class="col-md-12">
                      <div class="table-responsive">
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
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>ไมโครโฟน</td>
                              <td>M21</td>
                              <td>ใช้งานได้</td>
                              <td>แก้ไขเรียบร้อย</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>ไมโครโฟน</td>
                              <td>M22</td>
                              <td>ใช้งานไม่ได้</td>
                              <td>กำลังดำเนินการแก้ไข</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>ไมโครโฟน</td>
                              <td>M23</td>
                              <td>ใช้งานไม่ได้</td>
                              <td>กำลังดำเนินการแก้ไข</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <nav aria-label="...">
                        <ul class="pagination justify-content-center">
                          <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">ก่อนหน้า</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">1</a>
                          </li>
                          <li class="page-item active">
                            <a class="page-link" href="#">
                              2
                              <span class="sr-only">(current)</span>
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">3</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">ต่อไป</a>
                          </li>
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
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h5 class="modal-title font-color-primary" id="report-title">{{ modal.text.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="room-name-select">{{ modal.text.room_name }}</label>
                <select class="form-control" id="room-name-select" required>
                  <option value="none" selected disabled hidden>{{ modal.text.option.room_name }}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <small
                  id="room-name-select-help"
                  class="form-text text-muted"
                >{{ modal.text.description.room_name }}</small>
              </div>
              <div class="form-group">
                <label for="tool-name-select">{{ modal.text.tool_name }}</label>
                <select class="form-control" id="tool-name-select" required>
                  <option value="none" selected disabled hidden>{{ modal.text.option.tool_name }}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <small
                  id="tool-name-select-help"
                  class="form-text text-muted"
                >{{ modal.text.description.tool_name }}</small>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >{{ button.close }}</button>
              <button type="reset" class="btn btn-danger">{{ button.reset }}</button>
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

export default {
  name: "ReportToolBroken",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      content: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          acknowledge: "แจ้งปัญหาเรียบร้อย",
          inprocess: "กำลังดำเนินการแก้ไขปัญหา",
          completed: "แก้ไขปัญหาเรียบร้อย",
          no_data: "ไม่พบข้อมูล",
          filter: {
            title: "กรองข้อมูลตาม",
            select_room_label: "เลือกห้องที่ต้องการ",
            select_start_date_label: "เลือกวันที่ต้องการเริ่มต้น",
            select_end_date_label: "เลือกวันที่ต้องการสิ้นสุด",
            option: {
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--",
            }
          },
          report: {
            table: {
              thead_no0: "#",
              thead_no1: "ชื่ออุปกรณ์",
              thead_no2: "ชื่อห้อง",
              thead_no3: "สถานะของอุปกรณ์",
              thead_no4: "สถานะของรายงาน"
            }
          }
        }
      },
      button: {
        report_problem: "แจ้งปัญหา",
        report_problem_now: "แจ้งปัญหาแบบทันที",
        close: "ปิด",
        reset: "คืนค่าเริ่มต้น",
        accept: "ยืนยัน"
      },
      modal: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          room_name: "ชื่อห้อง",
          tool_name: "ชื่ออุปกรณ์",
          description: {
            room_name: "แสดงเฉพาะที่ได้ทำการเข้าใช้งานเท่านั้น",
            tool_name: "แสดงเฉพาะอุปกรณ์ที่มีภายในห้องที่เลือกเท่านั้น"
          },
          option: {
            room_name: "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--",
            tool_name: "--กรุณาเลือกอุปกรณ์ที่ต้องการแจ้งปัญหา--"
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.accordion .card .card-header {
  cursor: pointer;
}
</style>