<template>
  <div id="manage-tool" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100"></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import axios from "axios";
const axiosConfig = require("../../assets/config.json");

export default {
  name: "ManageTool",
  components: {
    Navbar: Navbar
  },
  created() {},
  data() {
    return {
      content: {
        text: {}
      },
      button: {}
    };
  },
  methods: {}
};
</script>