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
                <div class="card-body">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <div class="row">
                        <div
                          class="col-md-12"
                          v-if="content.table.room.body.length === 0"
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
                                  <td v-if="content.table.room.body[index + content.table.room.startRow].RoomActive === 1">{{ content.table.room.status.open }}</td>
                                  <td v-if="content.table.room.body[index + content.table.room.startRow].RoomActive === 0">{{ content.table.room.status.noopen }}</td>
                                  <td><button type="button" class="btn btn-sm btn-info"><i class="fa fa-edit"></i></button></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                            <div class="col-md-12">
                              <nav aria-label="...">
                                <ul class="pagination justify-content-center">
                                  <div
                                    v-for="page in Math.ceil(content.table.room.body.length / content.table.room.rowPerPages)"
                                    v-bind:key="page"
                                  >
                                    <li
                                      class="page-item active"
                                      v-if="page === content.table.room.currentPage"
                                    >
                                      <button
                                        class="page-link"
                                        @click="onPageChange(page)"
                                      >{{ page }}</button>
                                    </li>
                                    <li class="page-item" v-else>
                                      <button
                                        class="page-link"
                                        @click="onPageChange(page)"
                                      >{{ page }}</button>
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
    this.getRoom()
    this.onPageChange(1)
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
            startRow: 0,
            rowPerPages: 10,
            currentPage: 0,
            message: "ไม่พบห้อง",
            status: {
              open: "เปิดให้ใช้งาน",
              noopen: "ไม่เปิดให้ใช้งาน"
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

      axios
        .get(path)
        .then(res => {
          if (res.data) {
            for (var index in res.data) {
              this.content.table.room.body.push({
                RoomId: res.data[index].RoomId,
                RoomName: res.data[index].RoomName,
                RoomFloor: res.data[index].RoomFloor,
                RoomActive: res.data[index].RoomActive
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onPageChange(page) {
      this.content.table.room.currentPage = page;
      this.content.table.room.startRow =
        this.content.table.room.rowPerPages * (page - 1);
    }
  }
};
</script>