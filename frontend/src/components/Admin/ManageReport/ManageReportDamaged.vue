<template>
  <div>
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
  </div>
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