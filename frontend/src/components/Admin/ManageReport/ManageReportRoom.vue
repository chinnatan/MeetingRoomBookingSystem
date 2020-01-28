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
                    <div class="col-md-12">
                      <h5 class="card-title">{{ content.text.report.title }}</h5>
                    </div>
                  </div>
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
                              <th scope="col">{{ content.text.report.table.thead_no5 }}</th>
                              <th scope="col">{{ content.text.report.table.thead_no6 }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>ติวสอบวิชา OOP</td>
                              <td>M21</td>
                              <td>27/01/2563</td>
                              <td>ชินธันย์ ชาติทอง</td>
                              <td>จอง</td>
                              <td>ยังไม่ได้เข้าใช้งาน</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>วางแผนงาน ITOPENHOUSE 2020</td>
                              <td>M22</td>
                              <td>26/01/2563</td>
                              <td>ชินธันย์ ชาติทอง</td>
                              <td>จอง</td>
                              <td>ยังไม่ได้เข้าใช้งาน</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>ติวสอบวิชา ISAD</td>
                              <td>M23</td>
                              <td>25/01/2563</td>
                              <td>ชินธันย์ ชาติทอง</td>
                              <td>จอง</td>
                              <td>เข้าใช้งาน</td>
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

export default {
  name: "ManageReportRoom",
  components: {
    Navbar: Navbar
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
              default_select_room: "--กรุณาเลือกห้องที่ต้องการ--",
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
              thead_no5: "สถานะของการจอง",
              thead_no6: "สถานะของการเข้าใช้งาน"
            }
          }
        }
      },
      button: {
        print_report: "พิมพ์รายงาน"
      }
    };
  }
};
</script>