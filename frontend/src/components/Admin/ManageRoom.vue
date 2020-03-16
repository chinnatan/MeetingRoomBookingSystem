<template>
  <div id="manage-tool" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 pt-4 mb-2">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
              <small>{{ content.text.title_description }}</small>
            </div>
          </div>
          <div class="row justify-content-center">
              <div class="col-md-12">
                  <div class="card shadow-sm">
                      <div class="card-body"></div>
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

import axios from "axios";
const axiosConfig = require("../../assets/config.json");

export default {
  name: "ManageRoom",
  components: {
    Navbar: Navbar
  },
  created() {},
  data() {
    return {
      content: {
        text: {
            title: "จัดการห้อง"
        }
      },
      button: {}
    };
  },
  methods: {}
};
</script>