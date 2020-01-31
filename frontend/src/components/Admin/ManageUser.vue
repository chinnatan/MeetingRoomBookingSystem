<template>
  <div>
    <navbar></navbar>

    <div id="title" class="container">
      <div class="row mt-5 p-3">
        <div class="col-md-12">
          <h1 class="mb-0 lh-100 font-color-primary">{{ lblBlacklist }}</h1>
          <small>{{ lblBlacklistDetail }}</small>
        </div>
      </div>
    </div>

    <div id="content" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-body">
              <div class="table-responsive text-left">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{ lblBlacklistTable.lblUID }}</th>
                      <th scope="col">{{ lblBlacklistTable.lblFullName }}</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>it59070040</td>
                      <td>ชินธันย์ ชาติทอง</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                        >{{ lblBlacklistTable.btnUnban }}</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>it59070042</td>
                      <td>ฐานเศรษฐ์ ลิ้มธารากร</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                        >{{ lblBlacklistTable.btnUnban }}</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>it59070055</td>
                      <td>ณัฐวัฒน์ เลาหะสัมพันธพร</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                        >{{ lblBlacklistTable.btnUnban }}</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="loadMore">
                <div class="row justify-content-center">
                  <div class="col-md-8">
                    <button type="button" class="btn btn-outline-primary">โหลดเพิ่มเติม</button>
                  </div>
                </div>
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

export default {
  name: "Blacklist",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      lblBlacklist: "จัดการการเข้าใช้งาน",
      lblBlacklistDetail: "สำหรับจัดการผู้ใช้งานที่ระบบจำกัดสิทธิ์การใช้งาน",
      lblBlacklistTable: {
        lblUID: "รหัสผู้ใช้งาน",
        lblFullName: "ชื่อ - นามสกุล",
        btnUnban: "ยกเลิกการแบน"
      }
    };
  }
};
</script>