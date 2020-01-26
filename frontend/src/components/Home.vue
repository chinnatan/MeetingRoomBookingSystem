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
                {{ content.text.title }}
                <small class="text-muted">{{ content.text.description }}</small>
              </h1>
              <hr class="my-4" />
              <ul class="list-unstyled text-left">
                <li>
                  <h3 class="text-left">{{ content.text.policy.title }}</h3>
                  <ul>
                    <li>{{ content.text.policy.no1 }}</li>
                    <li>{{ content.text.policy.no2 }}</li>
                    <li>{{ content.text.policy.no3 }}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                <router-link :to="{path: '/booking' }" replace>
                  <button type="button" class="btn btn-lg btn-outline-variasi-warna">{{ content.button.start }}</button>
                </router-link>
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
      content: {
        text: {
          title: "MRBS",
          description: "Meeting Room Booking System",
          policy: {
            title: "นโยบายสำหรับการใช้งานระบบ",
            no1: "เมื่อมีการจองห้องแล้วผู้จองสามารถยกเลิกการจองห้องได้ภายในระยะเวลาที่กำหนดให้แก่ระบบ",
            no2: "เมื่อจองห้องแล้วผู้จองต้องมาใช้งานห้องภายในระยะเวลาที่จอง",
            no3: "สามารถมาเข้าใช้งานได้ช้าภายในระยะเวลาที่กำหนดให้แก่ระบบ"
          }
        },
        button: {
          start: "เริ่มต้นใช้งาน"
        }
      }
    };
  }
};
</script>