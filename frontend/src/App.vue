<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.title = "Meeting Room Booking System - ระบบจองห้องประชุม"
  }
}
</script>

<style>
@import './assets/css/styles.css';

html, body {
  height: 100%;
}

#app {
  font-family: "Mitr-Medium";
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f4ff;
}

@media only screen and (min-device-width: 320px) and (max-device-height: 568px) {
  #app {
    height: 110% !important;
  }
}
</style>
