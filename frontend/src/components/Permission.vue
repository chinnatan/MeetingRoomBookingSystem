<template>
  <div id="404" class="h-100">
    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12 my-auto">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-1 font-color-primary">{{ content.text.error_code }}</h1>
              <h3>{{ content.text.error_code_name }}</h3>
              <small class="text-muted">{{ content.text.error_code_description }}</small>
            </div>
          </div>
          <div class="row m-5">
            <div class="col-md-12">
              <router-link :to="{path: '/' }" replace>
                <button
                  type="button"
                  class="btn btn-lg btn-outline-variasi-warna"
                  @click="signOut"
                >{{ button.back_home }}</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
const axiosConfig = require("../assets/config.json");

export default {
  name: "Permission",
  created() {
    this.isBanned(JSON.parse(localStorage.getItem("user")).id);
  },
  data() {
    return {
      content: {
        text: {
          error_code: "Permission",
          error_code_name: "This User is not allowed, please contact administrator",
          error_code_description: "ขออภัยคุณไม่มีสิทธ์เข้าใช้งานระบบ, กรุณาติดต่อผู้ดูแลระบบ"
        },
        isNotAllow: null
      },
      button: {
        back_home: "กลับหน้าหลัก"
      }
    };
  },
  methods: {
    isBanned(userId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/auth/user/ban/check/" +
        userId;

      axios
        .get(path)
        .then(res => {
          if (res.data.isBanned) {
            this.content.isNotAllow = false;
          } else {
            this.content.isNotAllow = true;
          }

          if (this.content.isNotAllow) {
            router.push({ name: "Home" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    signOut() {
      localStorage.clear();
    }
  }
};
</script>