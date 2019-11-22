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
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Mitr-Medium";
  height: auto !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f4ff;
}
</style>
