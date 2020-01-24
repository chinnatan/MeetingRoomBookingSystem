<template>
  <div id="home" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12 my-auto">
          <div class="row">
            <div class="col-md-12">
              <h1 class="font-color-primary text-left">
                MRBS
                <small class="text-muted">Meeting Room Booking System</small>
              </h1>
              <hr class="my-4" />
              <ul class="list-unstyled text-left">
                <li>
                  <h3 class="text-left">นโยบายสำหรับการใช้งานระบบ</h3>
                  <ul>
                    <li>เมื่อมีการจองห้องแล้วผู้จองสามารถยกเลิกการจองห้องได้ภายในระยะเวลาที่กำหนดให้แก่ระบบ</li>
                    <li>เมื่อจองห้องแล้วผู้จองต้องมาใช้งานห้องภายในระยะเวลาที่จอง</li>
                    <li>สามารถมาเข้าใช้งานได้ช้าภายในระยะเวลาที่กำหนดให้แก่ระบบ</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <button type="button" class="btn btn-lg btn-outline-variasi-warna">เริ่มต้นใช้งาน</button>
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
  name: "Home",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      title: {
        nameEn: "Meeting Room Booking System",
        nameTh: "ระบบจองห้องประชุม"
      },
      signin: {
        title: "Sign In",
        txtUsername: "Username",
        txtPassword: "Password",
        txtLogin: "Login"
      }
    };
  }
};
</script>