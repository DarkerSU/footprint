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
      :zoom="14"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      style="height:90vh"
      @ready="handler"
      @mousemove="syncPolyline"
      @click="paintPolyline"
      @rightclick="newPolyline"
    >
      <el-button type="primary" @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</el-button>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
      <bm-control></bm-control>
      <bm-polyline :path="path" v-for="(path,index) of polyline.paths" :key="index"></bm-polyline>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    name: "mapbox";

    return {
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
            featureType: "road",
            elementType: "all",
            stylers: {
              weight: "1",
              visibility: "off"
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
    subfp(){
       var obj = JSON.stringify(this.footprintobj);
        this.$emit("getselectMap", obj);
    },
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    handler({ e, BMap, map }) {
      // console.log(BMap, map);
    },
    paintPolyline(e) {
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(e.point, rs => {
        this.add.site = rs.address;
        //地址描述(string)=
        //  console.log(rs.address);          //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
        //  console.log(rs.addressComponents);//结构化的地址描述(object)
        ///console.log(rs.addressComponents.province); //省
        //console.log(rs.addressComponents.city); //城市
        //  consoley.log(rs.addressComponents.district); //区县
        //  console.log(rs.addressComponents.street); //街道
        //  console.log(rs.addressComponents.streetNumber); //门牌号
        //console.log(rs.surroundingPois[0].title); //附近的POI点(array)
        //  console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
        // console.log(this.add.site)
        // console.log(this.footprint),
        // console.log(this.footprint.push(this.add.site));//足迹位置地点数组
        // console.log(this.footprint);
        // console.log("经度:"+e.point.lng)
        // console.log("纬度:"+e.point.lat)
        this.footprintobj.lng = e.point.lng; //经度
        this.footprintobj.lat = e.point.lat; //纬度
        this.footprintobj.area = rs.addressComponents.province; //地区
        this.footprintobj.site =
          rs.addressComponents.city +
          rs.addressComponents.district +
          rs.addressComponents.street +
          rs.addressComponents.streetNumber +
          rs.surroundingPois[0].title; //地点
        console.log(this.footprintobj);
        console.log(this.$store.getters.getlng_lat);
      });
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
    }
  }
};
</script>
<style >
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