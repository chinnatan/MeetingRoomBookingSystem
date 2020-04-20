<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-second bg-white shadow-sm fixed-top">
      <div class="container">
        <router-link :to="{path: '/home' }" class="navbar-brand" replace>
          <font color="black">{{navbar.brand}}{{navbar.brandMeeting}}</font>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{path: '/home' }" class="nav-link" replace>{{ navbar.home }}</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarBookingDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ navbar.bookingTitle }}</a>
              <div class="dropdown-menu" aria-labelledby="navbarBookingDropdown">
                <router-link
                  :to="{path: '/booking' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.bookingDropdown.booking }}</router-link>
                <router-link
                  :to="{path: '/manage/booking' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.bookingDropdown.bookingInformation }}</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link
                :to="{path: '/report/tool' }"
                class="nav-link"
                replace
              >{{ navbar.reportDamaged }}</router-link>
            </li>
            <li class="nav-item dropdown" v-if="user.isAdmin">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarBookingDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ navbar.manageReport }}</a>
              <div class="dropdown-menu" aria-labelledby="navbarBookingDropdown">
                <router-link
                  :to="{path: '/admin/manage/report/room' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageReportDropdown.room }}</router-link>
                <router-link
                  :to="{path: '/admin/manage/report/tool' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageReportDropdown.tool }}</router-link>
              </div>
            </li>
            <li class="nav-item dropdown" v-if="user.isAdmin">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarBookingDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ navbar.manageSystem }}</a>
              <div class="dropdown-menu" aria-labelledby="navbarBookingDropdown">
                <router-link
                  :to="{path: '/admin/setting' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageSystemDropdown.setting }}</router-link>
                <router-link
                  :to="{path: '/admin/manage/room' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageSystemDropdown.room }}</router-link>
                <router-link
                  :to="{path: '/admin/manage/user' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageSystemDropdown.user }}</router-link>
                <router-link
                  :to="{path: '/admin/manage/tool/report' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.manageSystemDropdown.tool }}</router-link>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-user"></i>
                {{ navbar.account.username }}
                <i class="fa fa-caret-down"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link
                  :to="{path: '/admin/dashboard'}"
                  v-on:click.native="Dashboard"
                  class="dropdown-item"
                >{{ navbar.account.dashboard }}</router-link>
                <div class="dropdown-divider"></div>
                <router-link
                  :to="'#'"
                  v-on:click.native="signOut"
                  class="dropdown-item"
                >{{ navbar.account.logout }}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
const axiosConfig = require("../assets/config.json");

const HOST = axiosConfig.APIGATEWAY.HOST;
const PORT = axiosConfig.APIGATEWAY.PORT;
const API = "http://" + HOST + ":" + PORT

export default {
  name: "Navbar",
  created() {
    this.getUser();
  },
  data() {
    return {
      navbar: {
        brand: "ระบบจอง",
        brandMeeting: "ห้องประชุม",
        bookingTitle: "จัดการการจอง",
        bookingDropdown: {
          booking: "จองห้อง",
          bookingInformation: "ข้อมูลการจอง"
        },
        reportDamaged: "แจ้งอุปกรณ์เสียหาย",
        manageReport: "จัดการรายงาน",
        manageReportDropdown: {
          room: "รายงานการใช้งานห้อง",
          tool: "รายงานการแจ้งอุปกรณ์เสียหาย"
        },
        manageSystem: "จัดการระบบ",
        manageSystemDropdown: {
          setting: "ตั้งค่าทั่วไป",
          room: "จัดการห้อง",
          user: "จัดการผู้ใช้งาน",
          tool: "จัดการรายงานการแจ้งอุปกรณ์เสียหาย"
        },
        home: "หน้าหลัก",
        account: {
          username: "",
          dashboard: "แดชบอร์ด",
          logout: "ออกจากระบบ"
        }
      },
      user: {
        mail: "",
        status: "",
        role: "",
        isAdmin: null
      }
    };
  },
  methods: {
    getUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.navbar.account.username = user.fullname;
      this.user.mail = user.mail;
      this.user.status = user.status;
      this.user.role = user.role;
      this.user.isAdmin = user.isAdmin;
      this.isVerifyUser(user.id)
    },
    isVerifyUser(userId) {
      const path = API + "/api/auth/user/ban/check/" + userId;

      const headers = {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token"))
      };

      axios
        .get(path, { headers: headers })
        .then(res => {
          let rs = res.data;
          if (rs.isTokenValid) {
            this.$swal({
              title: "Token Notification",
              text: rs.message,
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "red",
              confirmButtonText: "ตกลง",
              cancelButtonText: "ยกเลิก",
              showCloseButton: false,
              showLoaderOnConfirm: true,
              allowOutsideClick: false
            }).then(result => {
              if (result.value) {
                localStorage.clear();
                router.push({ name: "SignIn" });
              }
            });
          } else if (rs.isBanned) {
            router.push({ name: "Permission" });
          }
        })
        .catch(error => {
          console.log(error);
          this.alert = true;
        });
    },
    signOut() {
      localStorage.clear();
      router.push({ name: "SignIn" });
    }
  }
};
</script>