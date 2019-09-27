<!-- 使用了vue baidu map 组件 -->
<template>
  <div class="mapbox">
    <div class="lwwmap">
      <div class="select">
        <div class="key">
          <el-input v-model="keyword" placeholder="请输入关键词">
            <template slot="prepend">关键词：</template>
          </el-input>
        </div>
        <div class="country">
          <el-input v-model="location" placeholder="请输入地区">
            <template slot="prepend">地区：</template>
          </el-input>
        </div>
      </div>
      <div class="selectSite">
        您选择的位置：
        <span>{{footprintobj.site}}</span>
      </div>
      <div>
        <el-button type="success" @click="subfp">确认本条足迹的位置</el-button>
      </div>
    </div>

    <baidu-map
      class="map"
      :center="{lng: 116.404, lat: 39.915}"
      :zoom="18"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      style="height:90vh"
      @click="paintPolyline"
    >
      <!-- <el-button type="primary" @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</el-button> -->
      <!-- 自动连点 -->
      <bm-polyline
        :path="polylinePath"
        stroke-color="red"
        :stroke-opacity="0.8"
        :stroke-weight="5"
        :editing="false"
        :clicking="true"
      ></bm-polyline>

      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
      <!-- 生成点 -->
      <bm-marker
        v-for="(item,index) of polylinePath"
        :key="index"
        :position="item"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    name: "mapbox";
    return {
      //用来保存新增点位
      polylinePath: [],
      location: "",
      keyword: "",
      add: {
        site: ""
      },
      footprintobj: {
        //保存经纬度 地区 地点
        lng: "",
        lat: "",
        area: "",
        site: ""
      },
      // 百度地图自定义样式
      mapStyle: {
        styleJson: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: {
              hue: "#007fff",
              saturation: 89
            }
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#ffffff"
            }
          }
        ]
      },
      polyline: {
        editing: false,
        paths: []
      }
    };
  },

  methods: {
    subfp() {
      var obj = JSON.stringify(this.footprintobj);
      this.$emit("getselectMap", obj);
    },

    paintPolyline(e) {
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(e.point, rs => {
        this.add.site = rs.address;

        this.footprintobj.lng = e.point.lng; //经度
        this.footprintobj.lat = e.point.lat; //纬度
        this.footprintobj.area = rs.addressComponents.province; //地区
        this.footprintobj.site =
          rs.addressComponents.city +
          rs.addressComponents.district +
          rs.addressComponents.street +
          rs.addressComponents.streetNumber +
          rs.surroundingPois[0].title; //地点
      });

       
      for (var i = 0; i < this.$store.getters.getlng_lat.length; i++) {
        this.polylinePath.push(this.$store.getters.getlng_lat[i]);
      }
    }
  },
  created() {
    // console.log(this.footprintobj);
    // console.log(this.$store.getters.getlng_lat);
    // console.log(this.polylinePath);
  }
};
</script>
<style>
.lwwmap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.lwwmap .select {
  display: flex;
  justify-content: flex-start;
}

.lwwmap .key .el-input .el-input__inner {
  min-height: 20px;
}

.lwwmap .selectSite {
  padding: 8px 0;
  font-size: 17px;
  font-weight: bold;
  color: red;
}
</style>