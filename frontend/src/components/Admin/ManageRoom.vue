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
                      <!-- <div class="row">
                            <div
                              class="col-md-12"
                              v-if="content.report.table.length === 0"
                            >{{ content.text.report.message }}</div>
                      </div>-->
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">{{ content.text.table.room.thead_no0 }}</th>
                                  <th scope="col">{{ content.text.table.room.thead_no1 }}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <!-- <th scope="row">{{ index + content.report.startRow }}</th>
                                      <td>{{ content.report.table[index + content.report.startRow].ToolName }}</td>
                                      <td>{{ content.report.table[index + content.report.startRow].RoomName }}</td>
                                      <td>{{ content.report.table[index + content.report.startRow].ReportDate }}</td>
                                      <td
                                        v-if="content.report.table[index + content.report.startRow].ToolStatus === 0"
                                      >{{ content.text.report.status.tool.available }}</td>
                                      <td
                                        v-if="content.report.table[index + content.report.startRow].ToolStatus === 1"
                                      >{{ content.text.report.status.tool.noavailable }}</td>
                                      <td
                                        v-if="content.report.table[index + content.report.startRow].ReportStatus === 'A'"
                                      >{{ content.text.report.status.acknowledge }}</td>
                                      <td
                                        v-if="content.report.table[index + content.report.startRow].ReportStatus === 'IN'"
                                      >{{ content.text.report.status.inprocess }}</td>
                                      <td
                                        v-if="content.report.table[index + content.report.startRow].ReportStatus === 'C'"
                                  >{{ content.text.report.status.completed }}</td>-->
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="row">
                            <div class="col-md-12">
                              <nav aria-label="...">
                                <ul class="pagination justify-content-center">
                                  <div
                                    v-for="page in Math.ceil(content.report.table.length / content.report.rowPerPages)"
                                    v-bind:key="page"
                                  >
                                    <li
                                      class="page-item active"
                                      v-if="page === content.report.currentPage"
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
                      </div>-->
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
  created() {},
  data() {
    return {
      content: {
        text: {
          title: "จัดการห้อง",
          table: {
            room: {
              thead_no0: "ชื่อห้อง",
              thead_no1: "ชั้น"
            }
          }
        }
      },
      button: {}
    };
  },
  methods: {}
};
</script>