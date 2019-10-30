<template>
  <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-4">
        <div class="col-md-12">
          <div
            class="d-flex align-items-center p-3 my-3 text-white-50 bg-history-title rounded shadow-sm"
          >
            <div class="lh-100">
              <h6 class="mb-0 text-white lh-100 mitr-font">{{ lblHistoryTitle }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="content" class="container">
      <div class="card-deck">
        <div class="card">
          <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div class="card">
          <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div class="card">
          <img src="../assets/image/default-image.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "History",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      lblHistoryTitle: "ประวัติการใช้งาน"
    };
  }
};
</script>

<style scoped>
.bg-history-title {
  background-color: #0277bd;
}
</style>