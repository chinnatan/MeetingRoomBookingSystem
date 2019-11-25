<template>
  <div>
    <navbar></navbar>

    <div>
      <div class="container">
        <div class="row mt-1">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 mx-auto my-auto">
                <div class="row mt-5 p-3">
                  <div class="col-md-12">
                    <h1 class="font-color-primary">{{ txtFloor }} {{ floor }}</h1>
                    <small>แสดงชั้นที่คุณเลือก</small>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="col-md-12">
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
                        <div class="col-md-12">
                          <div class="card mt-2 mb-2 shadow-sm">
                            <div class="card-body">
                              <h5 class="font-color-primary">หมายเหตุ</h5>
                              <ul class="list-unstyled">
                                <li>
                                  <font color="green">{{ lblNote.color.lblGreen }}</font> - {{ lblNote.detail.lblGreen }}
                                </li>
                                <li>
                                  <font color="red">{{ lblNote.color.lblRed }}</font> - {{ lblNote.detail.lblRed }}
                                </li>
                                <li>
                                  <font color="lightblue">{{ lblNote.color.lblLightBlue }}</font> - {{ lblNote.detail.lblLightBlue }}
                                </li>
                                <li>
                                  <font color="gray">{{ lblNote.color.lblGray }}</font> - {{ lblNote.detail.lblGray }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card col-md-8 shadow-sm">
                        <div class="card-body">
                          <div class="col-md-12">
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
                              >
                                <Floor3></Floor3>
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
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <h5
                                        class="card-title booking-font"
                                      >{{ txtBooking.lblRoom }} {{ txtBooking.lblNameRoom }}</h5>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div
                                      class="col-md-12"
                                    >{{ txtFloor }} {{ txtBooking.lblFloorRoom }}</div>
                                  </div>
                                  <div class="row">
                                    <div
                                      class="col-md-12"
                                    >{{ txtBooking.lblSize }} {{ txtBooking.lblSizeRoom }} คน</div>
                                  </div>
                                </div>
                              </div>
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
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="row">
                                        <div class="col-md-12">ติวหนังสือ</div>
                                      </div>
                                      <div class="row">
                                        <div class="col-md-12">21/11/2562</div>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="row">
                                        <div class="col-md-12 align-self-center">09.00 - 10.00</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-body">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="row">
                                        <div class="col-md-12">ประชุมกิจกรรม</div>
                                      </div>
                                      <div class="row">
                                        <div class="col-md-12">21/11/2562</div>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="row">
                                        <div class="col-md-12 align-self-center">11.00 - 12.00</div>
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
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingStartDate"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingStartDate }}</label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    v-model="inputBookingStartDate"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label
                                    for="lblBookingEndDate"
                                    class="booking-font"
                                  >{{ txtBooking.lblBookingEndDate }}</label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    v-model="inputBookingEndDate"
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
import Floor3 from "@/components/Floor/Floor3";

export default {
  name: "Booking",
  components: {
    Navbar: Navbar,
    Floor1: Floor1,
    Floor2: Floor2,
    Floor3: Floor3
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
        lblSize: "รองรับ : ",
        lblBookingTitle: "หัวข้อการจอง",
        lblBookingStartDate: "วันที่เริ่มต้นการจอง",
        lblBookingEndDate: "วันที่สิ้นสุดการจอง",
        lblBookingStartTime: "เวลาเริ่มต้น",
        lblBookingEndTime: "เวลาสิ้นสุด",
        lblBookingDetail: "รายละเอียดการจอง",
        lblBookingSchedule: "ตารางเวลา",
        lblRoomId: "",
        lblNameRoom: "",
        lblSizeRoom: "",
        lblFloorRoom: "",
        lblPathImgRoom: "",
        btnBookingAccept: "ยืนยันการจอง",
        btnBookingReset: "คืนค่า"
      },
      lblNote: {
        color: {
          lblGreen: "สีเขียว",
          lblRed: "สีแดง",
          lblLightBlue: "สีฟ้า",
          lblGray: "สีเทา"
        },
        detail: {
          lblGreen: "ห้องว่าง ณ ขณะนั้น",
          lblRed: "ห้องไม่ว่าง ณ ขณะนั้น",
          lblLightBlue: "ห้องบริการการศึกษา",
          lblGray: "ห้องไม่เปิดให้ใช้งาน"
        }
      }
    };
  },
  mounted() {},
  methods: {
    selectRoom(id, name, size, floor, path) {
      this.selected = true;
      setTimeout(function() {
        document
          .getElementById("form-booking")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
      this.txtBooking.lblRoomId = id;
      this.txtBooking.lblNameRoom = name;
      this.txtBooking.lblSizeRoom = size;
      this.txtBooking.lblFloorRoom = floor;
      this.txtBooking.lblPathImgRoom = path;
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