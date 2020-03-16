<template>
  <div class="container">
    <breadcrumb></breadcrumb>
    <searchForm></searchForm>
    <el-row type="flex" class="wrapper">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row type="flex" class="location">
          <el-col :span="3">
            <i>区域：</i>
          </el-col>
          <el-col>
            <el-row type="flex" style="flex-wrap: wrap;width:520px">
              <span v-for="(item,index) of local" :key="index">
                <a href="#">{{item}}</a>
              </span>
            </el-row>
            <el-row type="flex" style="flex-wrap: wrap;width:520px" v-if="isShow">
              <span v-for="(item,index) of area" :key="index">
                <a href="#">{{item}}</a>
              </span>
            </el-row>
            <el-row>
              <i class="el-icon-d-arrow-left" @click="showContent" :class="{active:isShow}"></i>
              <span>等29个区域</span>
            </el-row>
          </el-col>
        </el-row>
        <!-- 均价 -->
        <el-row type="flex" class="price-wrapper">
          <el-col :span="5">
            均价&nbsp;&nbsp;
            <el-tooltip
              class="item"
              effect="dark"
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>：
          </el-col>
          <el-col :span="9">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="top-start"
              :visible-arrow="false"
            >
              <div>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥332</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="10">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="top-start"
              :visible-arrow="false"
            >
              <div>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥521</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="top-start"
              :visible-arrow="false"
            >
              <div>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥768</span>
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>
      <!-- 地图 -->
      <el-col style="width:422px;height:261px" id="gaodeMap"></el-col>
    </el-row>
  </div>
</template>

<script>
import breadcrumb from "@/components/hotel/breadcrumb";
import searchForm from "@/components/hotel/searchForm";
export default {
  data() {
    return {
      isShow: false,
      local: [
        "人民广场",
        "城桥镇",
        "奉贤区",
        "金山区",
        "建设镇",
        "三星镇",
        "新河镇",
        "通河/泗塘堡镇",
        "绿华镇",
        "南门",
        "向化镇",
        "陈家镇",
        "横沙乡",
        "博乐广场",
        "亭林"
      ],
      area: [
        "珠江新城",
        "陈家祠",
        "白云山",
        "琶洲",
        "西塔",
        "东塔",
        "上下九",
        "西沙",
        "中上大道",
        "东风一路",
        "东风二路",
        "东风三路",
        "东风四路"
      ]
    };
  },
  components: {
    breadcrumb,
    searchForm
  },
  mounted() {
    window.onLoad = function() {
      // 创建高德地图实例
      var map = new AMap.Map("gaodeMap", {
        zoom: 12, //级别
        center: [113.3245904, 23.1066805], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      //创建点标记
      var marker = new AMap.Marker({
        position: new AMap.LngLat(113.3245904, 23.1066805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        // 偏移量
        // offset: new AMap.Pixel(-1, -1),
        title: "广州塔"
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
      // 移除已创建的 marker
      // map.remove(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=bf7e6268bef485ff537e965c0fc9fe9b&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    showContent() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.el-icon-d-arrow-left {
  transform: rotate(-90deg);
  color: #ff9900;
  cursor: pointer;
}
.active {
  transform: rotate(90deg);
  color: #ff9900;
  cursor: pointer;
}
.wrapper {
  color: #666;
  font-size: 14px;
  margin-bottom: 22px;
  .location {
    span {
      margin-right: 14px;
      flex-wrap: wrap;
    }
  }
}
.price-wrapper {
  position: relative;
  margin-top: 25px;
  .el-icon-question {
    position: absolute;
    top: -5px;
    left: 29px;
    color: #cccccc;
  }
  .iconhuangguan {
    color: #ff9900;
  }
}
</style>