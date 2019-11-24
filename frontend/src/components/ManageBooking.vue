<template>
  <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-5 p-3">
        <div class="col-md-12">
          <h1 class="mb-0 lh-100 font-color-primary">{{ lblManageBooking }}</h1>
          <small>{{ lblManageBookingDetail }}</small>
        </div>
      </div>
    </div>

    <div id="content" class="container">
      <div id="bookingList">
        <div class="card-deck mb-4">
          <div class="card shadow">
            <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">ติวหนังสือสอบ</h5>
              <p class="card-text">ติวหนังสือสอบวิชา OOP</p>
              <p class="card-text">
                <small class="text-muted">วันที่ 22/11/2562 เวลา 11.00 - 12.00 น.</small>
              </p>
              <button type="button" class="btn btn-danger">{{ lblCancelBooking }}</button>
            </div>
          </div>
          <div class="card shadow">
            <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">ประชุมจัดกิจกรรมอาสา</h5>
              <p class="card-text">ประชุมการจัดกิจกรรมอาสาพี่สอนน้อง</p>
              <p class="card-text">
                <small class="text-muted">วันที่ 22/11/2562 เวลา 10.00 - 11.00 น.</small>
              </p>
              <button type="button" class="btn btn-danger">{{ lblCancelBooking }}</button>
            </div>
          </div>
          <div class="card shadow">
            <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">ทำ Project OOP</h5>
              <p class="card-text">ทำ Midterm Project OOP</p>
              <p class="card-text">
                <small class="text-muted">วันที่ 22/11/2562 เวลา 09.00 - 10.00 น.</small>
              </p>
              <button type="button" class="btn btn-danger">{{ lblCancelBooking }}</button>
            </div>
          </div>
        </div>
      </div>

      <div id="loadMore">
        <div class="row">
          <div class="col-md-12">
            <button type="button" class="btn btn-outline-primary">โหลดเพิ่มเติม</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "ManageBooking",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      lblManageBooking: "จัดการการจอง",
      lblCancelBooking: "ยกเลิกการจอง",
      lblManageBookingDetail: "สำหรับใช้ยกเลิกการจองหรือดูรายการการจองทั้งหมด"
    };
  }
};
</script>