<template>
  <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-5 p-3">
        <div class="col-md-12">
          <h1 class="mb-0 lh-100 font-color-primary">{{ lblSetting }}</h1>
          <small>{{ lblSettingDetail }}</small>
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
                  <label for="lblMaximumBookingTime">{{ lblSettingForm.lblMaximumBookingTime }}</label>
                  <input type="text" class="form-control" id="txtMaximumBookingTime" placeholder="หน่วยเป็นชั่วโมง">
                </div>
                <div class="form-group">
                  <label for="lblMaximumLateUnlock">{{ lblSettingForm.lblMaximumLateUnlock }}</label>
                  <input type="text" class="form-control" id="txtMaximumLateUnlock" placeholder="หน่วยเป็นนาที">
                </div>
                <div class="form-group">
                  <label for="lblBookingTime">{{ lblSettingForm.lblBookingTime }}</label>
                  <input type="text" class="form-control" id="ะปะBookingTime" placeholder="หน่วยเป็นวัน">
                </div>
                <div class="form-group">
                  <label for="lblCancelTime">{{ lblSettingForm.lblCancelTime }}</label>
                  <input type="text" class="form-control" id="lblCancelTime" placeholder="หน่วยเป็นวัน">
                </div>
                <div class="row">
                  <div class="col-md-12 ">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <button
                            type="button"
                            class="btn btn-success col-md-12"
                            @click="savePopup()"
                          >{{ lblSettingForm.btnSubmit }}</button>
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
  name: "Setting",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      lblSetting: "จัดการการเข้าใช้งาน",
      lblSettingDetail: "สำหรับจัดการการเข้าใช้งานทั้งหมด",
      lblSettingForm: {
        lblMaximumBookingTime: "เวลาที่จองได้สูงสุดต่อครั้ง (ชั่วโมง)",
        lblMaximumLateUnlock: "เวลาที่สามารถยืนยันการเข้าใช้งานช้าที่สุด (นาที)",
        lblBookingTime: "เวลาในการทำการจองล่วงหน้า (วัน)",
        lblCancelTime: "เวลาในการยกเลิกการจองล่วงหน้า (วัน)",
        btnSubmit: "บันทึก"
      }
    };
  },
  methods: {
    savePopup() {
      this.$swal({
        title: "สำเร็จ",
        text: "บันทึกการตั้งค่าสำเร็จ",
        type: "success",
        confirmButtonText: "ตกลง"
      })
    }
  }
};
</script>