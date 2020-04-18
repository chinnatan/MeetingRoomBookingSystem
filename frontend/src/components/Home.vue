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
                    <li><h2>{{ content.text.policy.no1 }}</h2></li>
                    <li><h2>{{ content.text.policy.no2 }}</h2></li>
                    <li><h2>{{ content.text.policy.no3 }}</h2></li>
                    <li><h2>{{ content.text.policy.no4 }}</h2></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <router-link :to="{path: '/booking' }" replace>
                <button
                  type="button"
                  class="btn btn-lg btn-outline-variasi-warna"
                >{{ content.button.start }}</button>
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
import axios from "axios";
const axiosConfig = require("../assets/config.json");

const HOST = axiosConfig.APIGATEWAY.HOST;
const PORT = axiosConfig.APIGATEWAY.PORT;
const API = "http://" + HOST + ":" + PORT

export default {
  name: "Home",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getPolicy()
  },
  data() {
    return {
      content: {
        text: {
          title: "MRBS",
          description: "Meeting Room Booking System",
          policy: {
            title: "นโยบายสำหรับการใช้งานระบบ",
            no1:
              "เมื่อมีการจองห้องแล้วผู้จองสามารถยกเลิกการจองห้องได้ภายในระยะเวลาที่กำหนดให้แก่ระบบ",
            no2: "เมื่อจองห้องแล้วผู้จองต้องมาใช้งานห้องภายในระยะเวลาที่จอง",
            no3: "สามารถมาเข้าใช้งานได้ช้าภายในระยะเวลาที่กำหนดให้แก่ระบบ",
            no4: null
          }
        },
        setting: {
          HighestPeriodPerTime: null,
          SlowestActivation: null,
          AdvanceBooking: null,
          AdvanceCancel: null,
          Unit: {
            HighestPeriodPerTime: null,
            SlowestActivation: null,
            AdvanceBooking: {
              ShortName: null,
              LongName: null
            },
            AdvanceCancel: {
              ShortName: null,
              FLongNameF: null
            }
          }
        },
        button: {
          start: "เริ่มต้นใช้งาน"
        }
      }
    };
  },
  methods: {
    getPolicy() {
      const path = API + "/api/setting/";

      axios
        .get(path)
        .then(res => {
          let rs = res.data
          if (rs) {
            this.content.setting.HighestPeriodPerTime = rs.HighestPeriodPerTime
            this.content.setting.SlowestActivation = rs.SlowestActivation
            this.content.setting.AdvanceBooking = rs.AdvanceBooking
            this.content.setting.AdvanceCancel = rs.AdvanceCancel
            this.content.setting.Unit.HighestPeriodPerTime = rs.Unit.HighestPeriodPerTime
            this.content.setting.Unit.SlowestActivation = rs.Unit.SlowestActivation
            this.content.setting.Unit.AdvanceBooking.ShortName = rs.Unit.AdvanceBooking.ShortName
            this.content.setting.Unit.AdvanceBooking.LongName = rs.Unit.AdvanceBooking.LongName
            this.content.setting.Unit.AdvanceCancel.ShortName = rs.Unit.AdvanceCancel.ShortName
            this.content.setting.Unit.AdvanceCancel.LongName = rs.Unit.AdvanceCancel.LongName

            this.content.text.policy.no1 = "ผู้ใช้งานต้องทำการจองห้องก่อน " + this.content.setting.AdvanceBooking + " " + this.content.setting.Unit.AdvanceBooking.LongName
            this.content.text.policy.no2 = "ผู้ใช้งานต้องทำการยกเลิกการจองห้องก่อน " + this.content.setting.AdvanceCancel + " " + this.content.setting.Unit.AdvanceCancel.LongName
            this.content.text.policy.no3 = "ผู้ใช้งานต้องเข้าใช้งานห้องภายในระยะเวลา " + this.content.setting.SlowestActivation + " " + this.content.setting.Unit.SlowestActivation + " โดยนับจากเวลาเริ่มต้นใช้งาน"
            this.content.text.policy.no4 = "ผู้ใช้งานสามารถจองห้องได้ครั้งละ " + this.content.setting.HighestPeriodPerTime + " " + this.content.setting.Unit.HighestPeriodPerTime
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>