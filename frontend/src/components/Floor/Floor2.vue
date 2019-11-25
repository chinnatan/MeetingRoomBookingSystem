<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <svg
            id="floor2"
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
              <title>Floor 2</title>
              <rect
                id="floor_2_226"
                height="92"
                width="92"
                y="90"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[11].id, txtFloor[11].name, txtFloor[11].size, txtFloor[11].floor, txtFloor[11].pathImg)"
              />
              <rect
                id="floor_2_225"
                height="62"
                width="92"
                y="190"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[10].id, txtFloor[10].name, txtFloor[10].size, txtFloor[10].floor, txtFloor[10].pathImg)"
              />
              <rect
                id="floor_2_223"
                height="92"
                width="92"
                y="330"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[8].id, txtFloor[8].name, txtFloor[8].size, txtFloor[8].floor, txtFloor[8].pathImg)"
              />
              <rect
                id="floor_2_224"
                height="62"
                width="92"
                y="260"
                x="413"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[9].id, txtFloor[9].name, txtFloor[9].size, txtFloor[9].floor, txtFloor[9].pathImg)"
              />
              <rect
                id="floor_2_207"
                height="152"
                width="92"
                y="10"
                x="100"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[2].id, txtFloor[2].name, txtFloor[2].size, txtFloor[2].floor, txtFloor[2].pathImg)"
              />
              <rect
                id="floor_2_205"
                height="82"
                width="92"
                y="170"
                x="100"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[1].id, txtFloor[1].name, txtFloor[1].size, txtFloor[1].floor, txtFloor[1].pathImg)"
              />
              <rect
                id="floor_2_203"
                height="164"
                width="92"
                y="260"
                x="99.25"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[0].id, txtFloor[0].name, txtFloor[0].size, txtFloor[0].floor, txtFloor[0].pathImg)"
              />
              <rect
                id="floor_2_219"
                height="92"
                width="46"
                y="200"
                x="280"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[4].id, txtFloor[4].name, txtFloor[4].size, txtFloor[4].floor, txtFloor[4].pathImg)"
              />
              <rect
                id="floor_2_218"
                height="92"
                width="46"
                y="300"
                x="280"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[3].id, txtFloor[3].name, txtFloor[3].size, txtFloor[3].floor, txtFloor[3].pathImg)"
              />
              <rect
                id="floor_2_222"
                height="72"
                width="46"
                y="200"
                x="330"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[7].id, txtFloor[7].name, txtFloor[7].size, txtFloor[7].floor, txtFloor[7].pathImg)"
              />
              <rect
                id="floor_2_221"
                height="52"
                width="46"
                y="280"
                x="330"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[6].id, txtFloor[6].name, txtFloor[6].size, txtFloor[6].floor, txtFloor[6].pathImg)"
              />
              <rect
                id="floor_2_220"
                height="52"
                width="46"
                y="340"
                x="330"
                stroke-width="0"
                stroke="#000000"
                fill="#bfbfbf"
                v-on:click="selectRoom(txtFloor[5].id, txtFloor[5].name, txtFloor[5].size, txtFloor[5].floor, txtFloor[5].pathImg)"
              />
              <text
                xml:space="preserve"
                text-anchor="middle"
                id="txt_207"
                y="156"
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
                id="txt_205"
                xml:space="preserve"
                text-anchor="middle"
                y="246"
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
                id="txt_203"
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
                id="txt_219"
                xml:space="preserve"
                text-anchor="middle"
                y="286"
                x="304"
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
                id="txt_218"
                xml:space="preserve"
                text-anchor="middle"
                y="386"
                x="304"
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
                id="txt_222"
                xml:space="preserve"
                text-anchor="middle"
                y="266"
                x="353"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[7].name"
              ></text>
              <text
                id="txt_221"
                xml:space="preserve"
                text-anchor="middle"
                y="326"
                x="353"
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
                id="txt_220"
                xml:space="preserve"
                text-anchor="middle"
                y="386"
                x="353"
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
                id="txt_226"
                xml:space="preserve"
                text-anchor="middle"
                y="176"
                x="458"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#000000"
                fill="#000000"
                v-if="txtFloors"
                v-text="txtFloor[11].name"
              ></text>
              <text
                id="txt_225"
                xml:space="preserve"
                text-anchor="middle"
                y="246"
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
                id="txt_224"
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
                v-text="txtFloor[9].name"
              ></text>
              <text
                id="txt_223"
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
                v-text="txtFloor[8].name"
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
  name: "Floor2",
  created() {
    this.getRoomByFloor(2);
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