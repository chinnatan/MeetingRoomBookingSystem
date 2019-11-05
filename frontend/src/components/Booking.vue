<template>
  <div>
    <navbar></navbar>

    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 mx-auto my-auto">
                <div class="row mt-2">
                  <div class="col-md-12">
                    <h2 class="booking-font">{{ txtFloor }} {{ floor }}</h2>
                    <hr />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <div
                          class="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            class="nav-link active booking-font"
                            id="v-pills-floor1-tab"
                            data-toggle="pill"
                            href="#v-pills-floor1"
                            role="tab"
                            aria-controls="v-pills-floor1"
                            aria-selected="true"
                            v-on:click="changeFloor(1)"
                          >{{ txtFloor }} 1</a>
                          <a
                            class="nav-link"
                            id="v-pills-floor2-tab"
                            data-toggle="pill"
                            href="#v-pills-floor2"
                            role="tab"
                            aria-controls="v-pills-floor2"
                            aria-selected="false"
                            v-on:click="changeFloor(2)"
                          >{{ txtFloor }} 2</a>
                          <a
                            class="nav-link"
                            id="v-pills-floor3-tab"
                            data-toggle="pill"
                            href="#v-pills-floor3"
                            role="tab"
                            aria-controls="v-pills-floor3"
                            aria-selected="false"
                            v-on:click="changeFloor(3)"
                          >{{ txtFloor }} 3</a>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div class="tab-content" id="v-pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="v-pills-floor1"
                            role="tabpanel"
                            aria-labelledby="v-pills-floor1-tab"
                            v-if="floor === 1"
                          >
                            <Floor1></Floor1>
                          </div>
                          <div
                            class="tab-pane fade"
                            id="v-pills-floor2"
                            role="tabpanel"
                            aria-labelledby="v-pills-floor2-tab"
                            v-if="floor === 2"
                          >
                            <Floor2></Floor2>
                          </div>
                          <div
                            class="tab-pane fade"
                            id="v-pills-floor3"
                            role="tabpanel"
                            aria-labelledby="v-pills-floor3-tab"
                            v-if="floor === 3"
                          >3</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="form-booking">
      <div class="bg-light" v-if="selected === true">
        <div class="container">
          <div class="row mt-4 py-5">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h2 class="booking-font">{{ txtBooking.lblTitle }}</h2>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-4 text-left">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card shadow">
                            <img
                              src="../assets/image/itkmitl-building.jpg"
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5
                                class="card-title booking-font"
                              >{{ txtBooking.lblRoom }} {{ txtBooking.lblNameRoom }}</h5>
                              <p class="card-text booking-font">{{ txtFloor }} {{ floor }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="d-flex align-items-center p-3 my-3 text-white-50 bg-title rounded shadow-sm"
                          >
                            <div class="lh-100">
                              <h6
                                class="mb-0 text-white lh-100 mitr-font"
                              >{{ txtBooking.lblBookingSchedule }}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-body">
                              <div class="table-responsive">
                                <table class="table table-sm">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">First</th>
                                      <th scope="col">Last</th>
                                      <th scope="col">Handle</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">1</th>
                                      <td>Mark</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">2</th>
                                      <td>Jacob</td>
                                      <td>Thornton</td>
                                      <td>@fat</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">3</th>
                                      <td colspan="2">Larry the Bird</td>
                                      <td>@twitter</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 text-left">
                      <div class="row">
                        <div class="col-md-12">
                          <form>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingTitle"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingTitle }}</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="inputBookingTitle"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingDetail"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingDetail }}</label>
                                  <textarea
                                    class="form-control"
                                    v-model="inputBookingDetail"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label
                                    for="lblBookingDate"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingDate }}</label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    v-model="inputBookingDate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingStartTime"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingStartTime }}</label>
                                  <input
                                    type="time"
                                    class="form-control"
                                    v-model="inputBookingStartTime"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingEndTime"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingEndTime }}</label>
                                  <input
                                    type="time"
                                    class="form-control"
                                    v-model="inputBookingEndTime"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <button
                                    type="submit"
                                    class="btn btn-primary col-md-12 booking-font"
                                  >{{ txtBooking.btnBookingAccept }}</button>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <button
                                    type="reset"
                                    class="btn btn-danger col-md-12 booking-font"
                                  >{{ txtBooking.btnBookingReset }}</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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

import Floor1 from "@/components/Floor/Floor1";
import Floor2 from "@/components/Floor/Floor2";

export default {
  name: "Booking",
  components: {
    Navbar: Navbar,
    Floor1: Floor1,
    Floor2: Floor2
  },
  created() {},
  data() {
    return {
      selected: false,
      floor: 1,
      txtFloor: "ชั้นที่ :",
      txtBooking: {
        lblTitle: "จองห้อง",
        lblRoom: "ห้อง :",
        lblBookingTitle: "หัวข้อการจอง",
        lblBookingDate: "วันที่ต้องการจอง",
        lblBookingStartTime: "เวลาเริ่มต้น",
        lblBookingEndTime: "เวลาสิ้นสุด",
        lblBookingDetail: "รายละเอียดการจอง",
        lblBookingSchedule: "ตารางเวลา",
        lblNameRoom: "",
        btnBookingAccept: "ยืนยันการจอง",
        btnBookingReset: "คืนค่า"
      }
    };
  },
  mounted() {},
  methods: {
    selectRoom(name) {
      this.selected = true;
      setTimeout(function() {
        document
          .getElementById("form-booking")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
      this.txtBooking.lblNameRoom = name;
    },
    changeFloor(floor) {
      this.floor = floor;
      this.selected = false;
    }
  }
};
</script>

<style scoped>
.booking-font {
  font-family: "Mitr-Medium";
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
}

.cursor-pointer {
  cursor: pointer;
}

rect:hover {
  stroke-width: 2;
  stroke: #01579b;
}

.bg-title {
  background-color: #0277bd;
}
</style>