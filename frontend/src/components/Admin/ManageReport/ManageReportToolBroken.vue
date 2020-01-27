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
              <h1 class="font-color-primary">จัดการรายงาน</h1>
              <small>สำหรับจัดการรายงานสรุปการแจ้งอุปกรณ์เสียหาย</small>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="card-title">กรองข้อมูลตาม</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-row text-left">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="select-room">เลือกห้องที่ต้องการ</label>
                            <select class="form-control" id="select-room">
                              <option
                                value="none"
                                selected
                                disabled
                                hidden
                              >--กรุณาเลือกห้องที่ต้องการ--</option>
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
                            <label for="select-start-date">เลือกวันที่ต้องการเริ่มต้น</label>
                            <input type="date" class="form-control" id="select-start-date" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="select-end-date">เลือกวันที่ต้องการสิ้นสุด</label>
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
                      <h5 class="card-title">รายงานสรุปการแจ้งอุปกรณ์เสียหาย</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">ชื่ออุปกรณ์</th>
                              <th scope="col">ชื่อห้อง</th>
                              <th scope="col">สถานะของอุปกรณ์</th>
                              <th scope="col">สถานะของรายงาน</th>
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
          <div class="row mt-2 mb-5">
            <div class="col-md-12">
              <button type="button" class="btn btn-outline-variasi-warna col-md-12">
                พิมพ์รายงาน
                <i class="fa fa-print"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-5 p-3">
        <div class="col-md-12">
          <h1 class="mb-0 lh-100 font-color-primary">{{ ManageReportDamaged }}</h1>
          <small>{{ ManageReportDamagedDetail }}</small>
        </div>
      </div>
    </div>

    <div id="content" class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="form-group">
                  <label for="lblRoomSelect">{{ ManageReportDamagedForm.lblRoomSelect }}</label>
                  <select class="form-control" id="optRoomSelect">
                    <option value="" selected disabled hidden>เลือก</option>
                    <option>M03</option>
                    <option>M04</option>
                    <option>M21</option>
                    <option>M22</option>
                    <option>M23</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="lblStartDateSelect">{{ ManageReportDamagedForm.lblStartDateSelect }}</label>
                  <input type="date" class="form-control" id="dteStartDateSelect" />
                </div>
                <div class="form-group">
                  <label for="lblEndDateSelect">{{ ManageReportDamagedForm.lblEndDateSelect }}</label>
                  <input type="date" class="form-control" id="dteEndDateSelect" />
                </div>
                <div class="form-group">
                  <button
                    type="button"
                    class="btn btn-info col-md-12"
                  >{{ ManageReportDamagedForm.btnMakeReport }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="card shadow">
            <div class="card-body">
              <div class="table-responsive text-left">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{ ManageReportDamagedTable.lblRoomName }}</th>
                      <th scope="col">{{ ManageReportDamagedTable.lblDetailReport }}</th>
                      <th scope="col">{{ ManageReportDamagedTable.lblNameReport }}</th>
                      <th scope="col">{{ ManageReportDamagedTable.lblDateReport }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>M23</td>
                      <td>แอร์ไม่ค่อยเย็น</td>
                      <td>ชินธันย์ ชาติทอง</td>
                      <td>22/11/2562</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>M21</td>
                      <td>Projector ใช้งานไม่ได้</td>
                      <td>ฐานเศรษฐ์ ลิ้มธารากร</td>
                      <td>21/11/2562</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>M22</td>
                      <td>Projector ใช้งานไม่ได้</td>
                      <td>ณัฐวัฒน์ เลาหะสัมพันธพร</td>
                      <td>21/11/2562</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "ManageReportDamaged",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      ManageReportDamaged: "จัดการรายงาน",
      ManageReportDamagedDetail: "สำหรับจัดการรายงานสรุปการแจ้งอุปกรณ์เสียหาย",
      ManageReportDamagedTable: {
        lblRoomName: "ชื่อห้อง",
        lblDetailReport: "รายละเอียด",
        lblNameReport: "ชื่อผู้แจ้ง",
        lblDateReport: "วันที่แจ้ง"
      },
      ManageReportDamagedForm: {
        lblRoomSelect: "เลือกห้องที่ต้องการ",
        lblStartDateSelect: "เลือกวันที่ต้องการเริ่มต้น",
        lblEndDateSelect: "เลือกวันที่ต้องการสิ้นสุด",
        btnMakeReport: "ทำรายงาน"
      }
    };
  }
};
</script>