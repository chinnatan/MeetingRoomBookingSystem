<template>
  <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-5 p-3">
        <div class="col-md-12">
          <h1 class="mb-0 lh-100 font-color-primary">{{ lblReportDamaged }}</h1>
          <small>{{ lblReportDamagedDetail }}</small>
        </div>
      </div>
    </div>

    <div id="content" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow text-left">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="lblReportDamagedTitle">{{ lblReportForm.lblReportDamagedTitle }}</label>
                  <select class="form-control" id="optReportDamagedTitle">
                    <option>M03</option>
                    <option>M04</option>
                    <option>M21</option>
                    <option>M22</option>
                    <option>M23</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="lblReportDatamagedDetail">{{ lblReportForm.lblReportDamagedDetail }}</label>
                  <textarea class="form-control" id="txtReportDamagedDetail" rows="3"></textarea>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <button
                            type="submit"
                            class="btn btn-primary col-md-12"
                          >{{ lblReportForm.btnSubmit }}</button>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <button
                            type="reset"
                            class="btn btn-danger col-md-12"
                          >{{ lblReportForm.btnReset }}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
  name: "ReportDamaged",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      lblReportDamaged: "แจ้งอุปกรณ์เสียหาย",
      lblReportDamagedDetail: "สำหรับใช้แจ้งอุปกรณ์เสียหายภายในห้อง",
      lblReportForm: {
        lblReportDamagedTitle: "ห้องที่ต้องการแจ้ง",
        lblReportDamagedDetail: "รายละเอียด",
        btnSubmit: "ยืนยัน",
        btnReset: "คืนค่า"
      }
    };
  }
};
</script>
