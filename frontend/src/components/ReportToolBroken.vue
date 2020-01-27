<template>
  <div id="report-tool-broken" class="h-100">
    <div id="menu">
      <navbar></navbar>
    </div>

    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12">
          <div class="row mt-5 p-3">
            <div class="col-md-12">
              <h1 class="font-color-primary">{{ content.text.title }}</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-outline-variasi-warna col-md-12"
                data-toggle="modal"
                data-target="#report-problem-modal"
              >{{ button.report_problem }}</button>
            </div>
          </div>
          <div class="row mt-3 mb-5">
            <div class="col-md-12">
              <div class="accordion shadow" id="accordion-report">
                <div class="card">
                  <div
                    class="card-header bg-primary text-white"
                    id="acknowledge"
                    data-toggle="collapse"
                    data-target="#collapse-acknowledge"
                    aria-expanded="true"
                    aria-controls="collapse-acknowledge"
                  >
                    <h6 class="mb-0">{{ content.text.acknowledge }}</h6>
                  </div>

                  <div
                    id="collapse-acknowledge"
                    class="collapse show"
                    aria-labelledby="acknowledge"
                    data-parent="#accordion-report"
                  >
                    <div class="card-body">
                      <div class="card-deck">
                        <div class="card">
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
                        <div class="card">
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
                </div>
                <div class="card">
                  <div
                    class="card-header bg-warning text-dark"
                    id="inprocess"
                    data-toggle="collapse"
                    data-target="#collapse-inprocess"
                    aria-expanded="false"
                    aria-controls="collapse-inprocess"
                  >
                    <h6 class="mb-0">{{ content.text.inprocess }}</h6>
                  </div>
                  <div
                    id="collapse-inprocess"
                    class="collapse"
                    aria-labelledby="inprocess"
                    data-parent="#accordion-report"
                  >
                    <div class="card-body">{{ content.text.no_data }}</div>
                  </div>
                </div>
                <div class="card">
                  <div
                    class="card-header bg-success text-white"
                    id="compelete"
                    data-toggle="collapse"
                    data-target="#collapse-compelete"
                    aria-expanded="false"
                    aria-controls="collapse-compelete"
                  >
                    <h6 class="mb-0">{{ content.text.completed }}</h6>
                  </div>
                  <div
                    id="collapse-compelete"
                    class="collapse"
                    aria-labelledby="compelete"
                    data-parent="#accordion-report"
                  >
                    <div class="card-body">{{ content.text.no_data }}</div>
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
      id="report-problem-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h5 class="modal-title font-color-primary" id="report-title">{{ modal.text.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="room-name-select">{{ modal.text.room_name }}</label>
                <select class="form-control" id="room-name-select">
                  <option selected disabled hidden>{{ modal.text.option.room_name }}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <small
                  id="room-name-select-help"
                  class="form-text text-muted"
                >{{ modal.text.description.room_name }}</small>
              </div>
              <div class="form-group">
                <label for="tool-name-select">{{ modal.text.tool_name }}</label>
                <select class="form-control" id="tool-name-select">
                  <option selected disabled hidden>{{ modal.text.option.tool_name }}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <small
                  id="tool-name-select-help"
                  class="form-text text-muted"
                >{{ modal.text.description.tool_name }}</small>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ button.close }}</button>
              <button type="reset" class="btn btn-danger">{{ button.reset }}</button>
              <button type="submit" class="btn btn-success">{{ button.accept }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "ReportToolBroken",
  components: {
    Navbar: Navbar
  },
  data() {
    return {
      content: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          acknowledge: "แจ้งปัญหาเรียบร้อย",
          inprocess: "กำลังดำเนินการแก้ไขปัญหา",
          completed: "แก้ไขปัญหาเรียบร้อย",
          no_data: "ไม่พบข้อมูล"
        }
      },
      button: {
          report_problem: "แจ้งปัญหา",
          close: "ปิด",
          reset: "คืนค่าเริ่มต้น",
          accept: "ยืนยัน"
      },
      modal: {
        text: {
          title: "แจ้งอุปกรณ์เสียหาย",
          room_name: "ชื่อห้อง",
          tool_name: "ชื่ออุปกรณ์",
          description: {
            room_name: "แสดงเฉพาะที่ได้ทำการเข้าใช้งานเท่านั้น",
            tool_name: "แสดงเฉพาะอุปกรณ์ที่มีภายในห้องที่เลือกเท่านั้น"
          },
          option: {
            room_name: "--กรุณาเลือกห้องที่ต้องการแจ้งปัญหา--",
            tool_name: "--กรุณาเลือกอุปกรณ์ที่ต้องการแจ้งปัญหา--"
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.accordion .card .card-header {
  cursor: pointer;
}
</style>