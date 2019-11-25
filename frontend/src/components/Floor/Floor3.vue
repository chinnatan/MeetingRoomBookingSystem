<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <svg
            id="floor3"
            width="100%"
            height="100%"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
            viewBox="0 0 600 440"
            stroke="none"
          >
            <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
            <g>
              <title>Floor 3</title>
              <rect
                id="floor_3_335"
                height="62"
                width="92"
                y="10"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[9].id, txtFloor[10].size, txtFloor[10].floor, txtFloor[10].pathImg)"
              />
              <rect
                id="floor_3_334"
                height="42"
                width="92"
                y="80"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[9].id, txtFloor[9].name, txtFloor[9].size, txtFloor[9].floor, txtFloor[9].pathImg)"
              />
              <rect
                id="floor_3_332"
                height="42"
                width="92"
                y="180"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[2].id, txtFloor[7].size, txtFloor[7].floor, txtFloor[7].pathImg)"
              />
              <rect
                id="floor_3_333"
                height="42"
                width="92"
                y="130"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[2].id, txtFloor[8].size, txtFloor[8].floor, txtFloor[8].pathImg)"
              />
              <rect
                id="floor_3_308"
                height="132"
                width="92"
                y="60"
                x="100"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[2].id, txtFloor[2].name, txtFloor[2].size, txtFloor[2].floor, txtFloor[2].pathImg)"
              />
              <rect
                id="floor_3_306"
                height="82"
                width="92"
                y="200"
                x="100"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[1].id, txtFloor[1].name, txtFloor[1].size, txtFloor[1].floor, txtFloor[1].pathImg)"
              />
              <rect
                id="floor_3_304"
                height="134"
                width="92"
                y="290"
                x="99.25"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[0].id, txtFloor[0].name, txtFloor[0].size, txtFloor[0].floor, txtFloor[0].pathImg)"
              />
              <rect
                id="floor_3_331"
                height="42"
                width="92"
                y="230"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[6].id, txtFloor[6].name, txtFloor[6].size, txtFloor[6].floor, txtFloor[6].pathImg)"
              />
              <rect
                id="floor_3_330"
                height="42"
                width="92"
                y="280"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[5].id, txtFloor[5].name, txtFloor[5].size, txtFloor[5].floor, txtFloor[5].pathImg)"
              />
              <rect
                id="floor_3_328"
                height="72"
                width="46"
                y="30"
                x="330"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[3].id, txtFloor[3].name, txtFloor[3].size, txtFloor[3].floor, txtFloor[3].pathImg)"
              />
              <rect
                id="floor_3_329"
                height="92"
                width="92"
                y="330"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[4].id, txtFloor[4].name, txtFloor[4].size, txtFloor[4].floor, txtFloor[4].pathImg)"
              />
              <text
                xml:space="preserve"
                text-anchor="middle"
                id="txt_308"
                y="186"
                x="146"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[2].name"
              ></text>
              <text
                id="txt_306"
                xml:space="preserve"
                text-anchor="middle"
                y="276"
                x="146"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[1].name"
              ></text>
              <text
                id="txt_304"
                xml:space="preserve"
                text-anchor="middle"
                y="416"
                x="146"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[0].name"
              ></text>
              <text
                id="txt_331"
                xml:space="preserve"
                text-anchor="middle"
                y="266"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[6].name"
              ></text>
              <text
                id="txt_330"
                xml:space="preserve"
                text-anchor="middle"
                y="316"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[5].name"
              ></text>
              <text
                id="txt_328"
                xml:space="preserve"
                text-anchor="middle"
                y="96"
                x="353"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[3].name"
              ></text>
              <text
                id="txt_329"
                xml:space="preserve"
                text-anchor="middle"
                y="416"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[4].name"
              ></text>
              <text
                id="txt_335"
                xml:space="preserve"
                text-anchor="middle"
                y="66"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[10].name"
              ></text>
              <text
                id="txt_334"
                xml:space="preserve"
                text-anchor="middle"
                y="116"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[9].name"
              ></text>
              <text
                id="txt_333"
                xml:space="preserve"
                text-anchor="middle"
                y="166"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[8].name"
              ></text>
              <text
                id="txt_332"
                xml:space="preserve"
                text-anchor="middle"
                y="216"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[7].name"
              ></text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const axiosConfig = require("../../assets/config.json");

export default {
  name: "Floor3",
  created() {
    this.getRoomByFloor(3);
  },
  data() {
    return {
      txtFloor: []
    };
  },
  computed: {
    txtFloors() {
      return this.txtFloor.length;
    }
  },
  methods: {
    selectRoom(id, name, size, floor, path) {
      if (id != null && name != null && size != null && floor != null && path != null) {
        this.$parent.selectRoom(id, name, size, floor, path);
      }
    },
    getRoomByFloor(floor) {
      const path =
        "http://" +
        axiosConfig.APIGATEWAY.HOST +
        ":" +
        axiosConfig.APIGATEWAY.PORT +
        "/api/" +
        axiosConfig.PATH.getRoomByFloor +
        "/" +
        floor;

      try {
        axios
          .get(path)
          .then(res => {
            var roomArrary = res.data;
            this.updateTxtFloor(roomArrary);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    },
    updateTxtFloor(room) {
      for (var roomIndex in room) {
        this.txtFloor.push({
          id: room[roomIndex].room_id,
          name: room[roomIndex].room_name,
          size: room[roomIndex].room_size,
          floor: room[roomIndex].room_floor,
          pathImg: room[roomIndex].room_pathImage
        });
      }
    }
  }
};
</script>

<style scoped>
rect:hover {
  cursor: pointer;
  stroke-width: 2;
  stroke: #01579b;
}

text:hover {
  cursor: pointer;
}
</style>