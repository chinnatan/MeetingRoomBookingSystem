<template>
  <div id="manage-room" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 pt-4 mb-2">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <div class="row mb-4">
                        <div class="col-md-12">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ค้นหาห้อง"
                            v-model="content.table.room.search"
                            @keyup="onSearch()"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-md-12"
                          v-if="content.table.room.body.length === 0 || content.table.room.body.length === 1"
                        >{{ content.table.room.message }}</div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive" v-if="content.table.room.body.length > 1">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">{{ content.text.table.room.thead_no0 }}</th>
                                  <th scope="col">{{ content.text.table.room.thead_no1 }}</th>
                                  <th scope="col">{{ content.text.table.room.thead_no2 }}</th>
                                  <th scope="col">{{ content.text.table.room.thead_no3 }}</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody
                                v-for="index in content.table.room.rowPerPages"
                                v-bind:key="index"
                              >
                                <tr
                                  v-if="index + content.table.room.startRow < content.table.room.body.length"
                                >
                                  <th scope="row">{{ index + content.table.room.startRow }}</th>
                                  <td>{{ content.table.room.body[index + content.table.room.startRow].RoomName }}</td>
                                  <td>{{ content.table.room.body[index + content.table.room.startRow].RoomFloor }}</td>
                                  <td
                                    v-if="content.table.room.body[index + content.table.room.startRow].RoomActive === 1"
                                  >{{ content.table.room.status.open }}</td>
                                  <td
                                    v-if="content.table.room.body[index + content.table.room.startRow].RoomActive === 0"
                                  >{{ content.table.room.status.noopen }}</td>
                                  <td>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-info"
                                      data-toggle="modal"
                                      data-target="#manage-room-modal"
                                      @click="getRoomDetail(content.table.room.body[index + content.table.room.startRow].RoomId)"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="content.table.room.body.length > 1">
                        <div class="col-md-12">
                          <nav>
                            <ul class="pagination justify-content-center">
                              <div
                                v-for="page in Math.ceil(content.table.room.body.length / content.table.room.rowPerPages)"
                                v-bind:key="page"
                              >
                                <li
                                  class="page-item active"
                                  v-if="page === content.table.room.currentPage"
                                >
                                  <button class="page-link" @click="onPageChange(page)">{{ page }}</button>
                                </li>
                                <li class="page-item" v-else>
                                  <button class="page-link" @click="onPageChange(page)">{{ page }}</button>
                                </li>
                              </div>
                            </ul>
                          </nav>
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

    <!-- Modal -->
    <div
      class="modal fade text-left"
      id="manage-room-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-color-primary">ห้อง {{ content.modal.room.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="preSendRoomSetting">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="alert alert-danger"
                    v-if="content.modal.room.alertMessage"
                    role="alert"
                  >{{ content.modal.room.alertMessage }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h5>สถานะของห้อง</h5>
                      <hr />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            name="active"
                            v-model="content.modal.room.radio.room_active"
                            value="1"
                          />เปิดให้ใช้งาน
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            name="active"
                            v-model="content.modal.room.radio.room_active"
                            value="0"
                          />ไม่เปิดให้ใช้งาน
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-5" v-if="content.modal.room.radio.room_active == 1">
                    <div class="col-md-12">
                      <h5>สิทธิ์การเข้าใช้งาน</h5>
                      <hr />
                    </div>
                  </div>
                  <div class="row" v-if="content.modal.room.radio.room_active == 1">
                    <div class="col-md-12">
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="content.modal.room.checkbox.student"
                            value
                          />นักศึกษา
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="content.modal.room.checkbox.professor"
                            value
                          />อาจารย์
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="content.modal.room.checkbox.staff"
                            value
                          />เจ้าหน้าที่ทั่วไป
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-5" v-if="content.modal.room.radio.tool.length !== 0">
                    <div class="col-md-12">
                      <h5>อุปกรณ์</h5>
                      <hr />
                    </div>
                  </div>
                  <div class="row" v-if="content.modal.room.radio.tool.length !== 0">
                    <div class="col-md-12">
                      <div
                        class="row"
                        v-for="(tool, index) in content.modal.room.radio.tool"
                        :key="index"
                      >
                        <div class="col-md-4">{{ tool.ToolName }}</div>
                        <div class="col-md-8">
                          <div class="form-check-inline">
                            <label class="form-check-label">
                              <input
                                type="radio"
                                class="form-check-input"
                                v-model="tool.ToolStatus"
                                value="1"
                              />ใช้งานได้
                            </label>
                          </div>
                          <div class="form-check-inline">
                            <label class="form-check-label">
                              <input
                                type="radio"
                                class="form-check-input"
                                v-model="tool.ToolStatus"
                                value="0"
                              />ใช้งานไม่ได้
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">ยกเลิก</button>
              <button type="submit" class="btn btn-sm btn-success">บันทึก</button>
            </div>
          </form>
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
  created() {
    this.getRoom();
    this.onPageChange(1);
  },
  data() {
    return {
      content: {
        text: {
          title: "จัดการห้อง",
          table: {
            room: {
              thead_no0: "#",
              thead_no1: "ชื่อห้อง",
              thead_no2: "ชั้น",
              thead_no3: "สถานะ"
            }
          }
        },
        table: {
          room: {
            body: [{}],
            tempBody: [{}],
            startRow: 0,
            rowPerPages: 10,
            currentPage: 0,
            message: "ไม่พบห้อง",
            status: {
              open: "เปิดให้ใช้งาน",
              noopen: "ไม่เปิดให้ใช้งาน"
            },
            search: null
          }
        },
        modal: {
          room: {
            roomId: null,
            title: null,
            alertMessage: null,
            radio: {
              room_active: null,
              tool: []
            },
            checkbox: {
              student: null,
              professor: null,
              staff: null
            }
          }
        }
      }
    };
  },
  methods: {
    getRoom() {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/room/all";

      this.content.table.room.body = [{}];
      this.content.table.room.tempBody = [{}];

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var index in res.data) {
              this.content.table.room.body.push({
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName,
                RoomFloor: res.data[index].RoomFloor,
                RoomPermissionStudent: res.data[index].RoomPermissionStudent,
                RoomPermissionProfessor:
                  res.data[index].RoomPermissionProfessor,
                RoomPermissionStaff: res.data[index].RoomPermissionStaff,
                RoomActive: res.data[index].RoomActive
              });

              this.content.table.room.tempBody.push({
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName,
                RoomFloor: res.data[index].RoomFloor,
                RoomPermissionStudent: res.data[index].RoomPermissionStudent,
                RoomPermissionProfessor:
                  res.data[index].RoomPermissionProfessor,
                RoomPermissionStaff: res.data[index].RoomPermissionStaff,
                RoomActive: res.data[index].RoomActive
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRoomDetail(roomId) {
      this.content.modal.room.alertMessage = null
      for (var index in this.content.table.room.body) {
        if (this.content.table.room.body[index].RoomId === roomId) {
          this.content.modal.room.roomId = this.content.table.room.body[
            index
          ].RoomId;
          this.content.modal.room.title = this.content.table.room.body[
            index
          ].RoomName;
          this.content.modal.room.radio.room_active = this.content.table.room.body[
            index
          ].RoomActive;
          this.content.modal.room.checkbox.student = this.content.table.room.body[
            index
          ].RoomPermissionStudent;
          this.content.modal.room.checkbox.professor = this.content.table.room.body[
            index
          ].RoomPermissionProfessor;
          this.content.modal.room.checkbox.staff = this.content.table.room.body[
            index
          ].RoomPermissionStaff;
          this.getTool(roomId);
        }
      }
    },
    getTool(roomId) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/tool/" +
        roomId;

      this.content.modal.room.radio.tool = [];

      axios
        .get(path)
        .then(res => {
          if (!res.data.message) {
            for (var index in res.data) {
              this.content.modal.room.radio.tool.push({
                ToolId: res.data[index].ToolId,
                ToolName: res.data[index].ToolName,
                ToolStatus: res.data[index].ToolStatus
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    preSendRoomSetting() {
      if (
        this.content.modal.room.roomId == null ||
        this.content.modal.room.radio.room_active == null ||
        this.content.modal.room.checkbox.student == null ||
        this.content.modal.room.checkbox.professor == null ||
        this.content.modal.room.checkbox.staff == null
      ) {
        this.content.modal.room.alertMessage = "กรุณาระบุข้อมูลให้ครบถ้วน";
      } else if (
        this.content.modal.room.checkbox.student == false &&
        this.content.modal.room.checkbox.professor == false &&
        this.content.modal.room.checkbox.staff == false &&
        this.content.modal.room.radio.room_active == true
      ) {
        this.content.modal.room.alertMessage = "หากต้องการยกเลิกสิทธิ์ทั้งหมด ต้องปิดการใช้งานห้อง";
      } else {
        let payload = {
          isAdmin: JSON.parse(localStorage.getItem("user")).isAdmin,
          RoomId: this.content.modal.room.roomId,
          RoomPermissionStudent:
            this.content.modal.room.checkbox.student == false ? 0 : 1,
          RoomPermissionProfessor:
            this.content.modal.room.checkbox.professor == false ? 0 : 1,
          RoomPermissionStaff:
            this.content.modal.room.checkbox.staff == false ? 0 : 1,
          RoomActive: this.content.modal.room.radio.room_active,
          Tool: JSON.stringify(this.content.modal.room.radio.tool)
        };

        // console.log(payload)
        this.SendRoomSetting(payload);
      }
    },
    SendRoomSetting(payload) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/room/setting/save";

      axios
        .post(path, JSON.stringify(payload))
        .then(res => {
          if (res.data.isError) {
            this.$swal("บันทึก", "การตั้งค่าไม่สำเร็จ", "error");
            $("#manage-room-modal").modal("hide");
          } else {
            this.$swal("บันทึก", res.data.message, "success");
            $("#manage-room-modal").modal("hide");
            this.getRoom();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSearch() {
      let searchText = this.content.table.room.search.trim();

      this.content.table.room.body = [{}];

      if (searchText == null || searchText == "") {
        this.getRoom();
      } else {
        for (
          var index = 1;
          index < this.content.table.room.tempBody.length;
          index++
        ) {
          let searchFound = this.content.table.room.tempBody[
            index
          ].RoomName.indexOf(searchText);
          if (searchFound > -1) {
            this.content.table.room.body.push(
              this.content.table.room.tempBody[index]
            );
          }
        }
      }
    },
    onPageChange(page) {
      this.content.table.room.currentPage = page;
      this.content.table.room.startRow =
        this.content.table.room.rowPerPages * (page - 1);
    }
  }
};
</script>