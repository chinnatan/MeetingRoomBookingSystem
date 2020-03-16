<template>
  <div id="setting">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 p-4">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <form method="POST" @submit.prevent="preUpdateSetting">
                        <div class="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              <label
                                for="settingHighestPeriodPerTime"
                              >{{ content.text.settingHighestPeriodPerTime }}</label>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingHighestPeriodPerTime"
                              >
                                <option
                                  v-for="(line, index) in content.setting.form.hour"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingHighestPeriodPerTime)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="unitHighestPeriodPerTime">{{ content.text.unit }}</label>
                            <select
                              class="form-control"
                              v-model="content.setting.form.input.unitHighestPeriodPerTime"
                              disabled
                            >
                              <option>ชั่วโมง</option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              <label
                                for="settingSlowestActivation"
                              >{{content.text.settingSlowestActivation}}</label>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingSlowestActivation"
                              >
                                <option
                                  v-for="(line, index) in content.setting.form.minute"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingSlowestActivation)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="unitSlowestActivation">{{ content.text.unit }}</label>
                            <select
                              class="form-control"
                              v-model="content.setting.form.input.unitSlowestActivation"
                              disabled
                            >
                              <option>นาที</option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              <label
                                for="settingAdvanceBooking"
                              >{{content.text.settingAdvanceBooking}}</label>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceBooking"
                                v-if="content.setting.form.input.unitAdvanceBooking === 'นาที'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceBooking === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.minute"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceBooking)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceBooking"
                                v-if="content.setting.form.input.unitAdvanceBooking === 'ชั่วโมง'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceBooking === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.hour"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceBooking)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceBooking"
                                v-if="content.setting.form.input.unitAdvanceBooking === 'วัน'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceBooking === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.day"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceBooking)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="unitAdvanceBooking">{{ content.text.unit }}</label>
                            <select
                              class="form-control"
                              v-model="content.setting.form.input.unitAdvanceBooking"
                              @change="onChangeUnit('AdvanceBooking')"
                            >
                              <option
                                v-for="(line, index) in content.setting.form.unit"
                                :key="index"
                                :selected="line === parseInt(content.setting.form.input.unitAdvanceBooking)"
                                :value="line"
                              >{{ line }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              <label
                                for="settingAdvanceCancel"
                              >{{content.text.settingAdvanceCancel}}</label>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceCancel"
                                v-if="content.setting.form.input.unitAdvanceCancel === 'นาที'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceCancel === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.minute"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceCancel)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceCancel"
                                v-if="content.setting.form.input.unitAdvanceCancel === 'ชั่วโมง'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceCancel === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.hour"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceCancel)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                              <select
                                class="form-control"
                                v-model="content.setting.form.input.settingAdvanceCancel"
                                v-if="content.setting.form.input.unitAdvanceCancel === 'วัน'"
                              >
                                <option
                                  :selected="content.setting.form.input.settingAdvanceCancel === content.setting.form.defaultUnit"
                                  :value="content.setting.form.defaultUnit"
                                  disabled
                                >{{ content.setting.form.defaultUnit }}</option>
                                <option
                                  v-for="(line, index) in content.setting.form.day"
                                  :key="index"
                                  :selected="line === parseInt(content.setting.form.input.settingAdvanceCancel)"
                                  :value="line"
                                >{{ line }}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label for="unitAdvanceCancel">{{ content.text.unit }}</label>
                            <select
                              class="form-control"
                              v-model="content.setting.form.input.unitAdvanceCancel"
                              @change="onChangeUnit('AdvanceCancel')"
                            >
                              <option
                                v-for="(line, index) in content.setting.form.unit"
                                :key="index"
                                :selected="line === parseInt(content.setting.form.input.unitAdvanceCancel)"
                                :value="line"
                              >{{ line }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <button
                              type="submit"
                              class="btn btn-success col-md-12"
                            >{{ content.text.button.save }}</button>
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
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";

const axiosConfig = require("../../assets/config.json");

export default {
  name: "Setting",
  components: {
    Navbar: Navbar
  },
  created() {
    this.getSetting();
  },
  data() {
    return {
      content: {
        text: {
          title: "ตั้งค่าทั่วไป",
          settingHighestPeriodPerTime: "ระยะเวลาที่สามารถจองได้สูงสุดต่อครั้ง",
          settingSlowestActivation:
            "ระยะเวลาที่สามารถยืนยันการเข้าใช้งานได้ช้าที่สุด",
          settingAdvanceBooking: "ระยะเวลาในการทำการจองล่วงหน้า",
          settingAdvanceCancel: "ระยะเวลาในการยกเลิกการจองล่วงหน้า",
          unit: "หน่วย",
          button: {
            save: "บันทึก"
          }
        },
        setting: {
          form: {
            input: {
              settingHighestPeriodPerTime: null,
              settingSlowestActivation: null,
              settingAdvanceBooking: null,
              settingAdvanceCancel: null,
              unitHighestPeriodPerTime: null,
              unitSlowestActivation: null,
              unitAdvanceBooking: null,
              unitAdvanceCancel: null
            },
            defaultUnit: "--กรุณาเลือกระยะเวลาที่ต้องการ--",
            unit: ["นาที", "ชั่วโมง", "วัน"],
            minute: [10, 20, 30],
            hour: [1, 2, 3],
            day: [1, 2, 3]
          }
        }
      }
    };
  },
  methods: {
    getSetting() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/setting";

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            this.content.setting.form.input.settingHighestPeriodPerTime =
              res.data.HighestPeriodPerTime;
            this.content.setting.form.input.unitHighestPeriodPerTime =
              res.data.Unit.HighestPeriodPerTime;
            this.content.setting.form.input.settingSlowestActivation =
              res.data.SlowestActivation;
            this.content.setting.form.input.unitSlowestActivation =
              res.data.Unit.SlowestActivation;
            this.content.setting.form.input.settingAdvanceBooking =
              res.data.AdvanceBooking;
            this.content.setting.form.input.unitAdvanceBooking =
              res.data.Unit.AdvanceBooking.LongName;
            this.content.setting.form.input.settingAdvanceCancel =
              res.data.AdvanceCancel;
            this.content.setting.form.input.unitAdvanceCancel =
              res.data.Unit.AdvanceCancel.LongName;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onChangeUnit(setting) {
      if (setting == "AdvanceBooking") {
        this.content.setting.form.input.settingAdvanceBooking = this.content.setting.form.defaultUnit;
      }

      if (setting == "AdvanceCancel") {
        this.content.setting.form.input.settingAdvanceCancel = this.content.setting.form.defaultUnit;
      }
    },
    preUpdateSetting() {
      if (
        this.content.setting.form.input.settingAdvanceBooking ==
          this.content.setting.form.defaultUnit ||
        this.content.setting.form.input.settingAdvanceCancel ==
          this.content.setting.form.defaultUnit
      ) {
        this.$swal({
          title: "ไม่สามารถทำรายการได้",
          text: "กรุณาเลือกระยะเวลาให้ครบถ้วน",
          type: "warning",
          confirmButtonText: "ตกลง"
        });
      } else {
        var shortNameAvanceBooking;
        var shortNameAvanceCancel;

        if (this.content.setting.form.input.unitAdvanceBooking == "นาที") {
          shortNameAvanceBooking = "M";
        } else if (
          this.content.setting.form.input.unitAdvanceBooking == "ชั่วโมง"
        ) {
          shortNameAvanceBooking = "H";
        } else if (
          this.content.setting.form.input.unitAdvanceBooking == "วัน"
        ) {
          shortNameAvanceBooking = "D";
        }

        if (this.content.setting.form.input.unitAdvanceCancel == "นาที") {
          shortNameAvanceCancel = "M";
        } else if (
          this.content.setting.form.input.unitAdvanceCancel == "ชั่วโมง"
        ) {
          shortNameAvanceCancel = "H";
        } else if (this.content.setting.form.input.unitAdvanceCancel == "วัน") {
          shortNameAvanceCancel = "D";
        }

        const payload = {
          HighestPeriodPerTime: this.content.setting.form.input
            .settingHighestPeriodPerTime,
          HighestDatePerTime: 1,
          SlowestActivation: this.content.setting.form.input
            .settingSlowestActivation,
          AdvanceBooking: this.content.setting.form.input.settingAdvanceBooking,
          AdvanceCancel: this.content.setting.form.input.settingAdvanceCancel,
          Unit: {
            HighestPeriodPerTime: this.content.setting.form.input
              .unitHighestPeriodPerTime,
            HighestDatePerTime: "วัน",
            SlowestActivation: this.content.setting.form.input
              .unitSlowestActivation,
            AdvanceBooking: {
              ShortName: shortNameAvanceBooking,
              LongName: this.content.setting.form.input.unitAdvanceBooking
            },
            AdvanceCancel: {
              ShortName: shortNameAvanceCancel,
              LongName: this.content.setting.form.input.unitAdvanceCancel
            }
          }
        };

        this.UpdateSetting(payload);
      }
    },
    UpdateSetting(payload) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/setting/update";

      axios
        .put(path, payload)
        .then(res => {
          if (res.data.isError) {
            this.$swal({
              title: "ไม่สามารถทำรายการได้",
              text: res.data.message,
              type: "warning",
              confirmButtonText: "ตกลง"
            });
          } else {
            this.$swal({
              title: "สำเร็จ",
              text: res.data.message,
              type: "success",
              confirmButtonText: "ตกลง"
            });
            this.getSetting()
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    savePopup() {
      this.$swal({
        title: "สำเร็จ",
        text: "บันทึกการตั้งค่าสำเร็จ",
        type: "success",
        confirmButtonText: "ตกลง"
      });
    }
  }
};
</script>