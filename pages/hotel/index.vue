<template>
  <div class="container">
    <!-- 面包屑 -->
    <breadcrumb :cityName="cityName"></breadcrumb>
    <!-- 查询价格 -->
    <searchForm @location="location"></searchForm>
    <!-- 区域、均价、地图 -->
    <el-row type="flex" class="wrapper">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row type="flex" class="location">
          <el-col :span="3">
            <i>区域：</i>
          </el-col>
          <el-col>
            <el-row
              type="flex"
              style="flex-wrap: wrap;width:520px"
              :class="{hiddenArea:areaShow}"
              v-if="local&&local.length>0"
            >
              <span v-for="(item,index) of local" :key="index">
                <a href="#">{{item.name}}</a>
              </span>
            </el-row>
            <el-row>
              <i class="el-icon-d-arrow-left" @click="showContent" :class="{active:isShow}"></i>
              <span>等{{local.length}}个区域</span>
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
    <!-- 分类筛选 -->
    <filters></filters>
    <!-- 酒店列表 -->
    <div>
      <!-- 酒店列表组件 -->
      <div v-if="hotelList.length">
        <hotelitem v-for="(item,index) of hotelList" :key="index" :hotel="item"></hotelitem>
      </div>
      <div v-else>暂无数据</div>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          v-if="hotelData.data&&hotelData.data.length>0"
          layout="total,sizes,prev, pager, next,jumper"
          :total="hotelData.data.length"
          :page-size="pageSize"
          :page-sizes="[2,5,10]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/hotel/breadcrumb";
import searchForm from "@/components/hotel/searchForm";
import filters from "@/components/hotel/filters";
import hotelitem from "@/components/hotel/hotelitem";
export default {
  data() {
    return {
      isShow: false,
      areaShow: true,
      local: {},
      cityName: "",
      // 获取到的所有数据
      hotelData: {},
      // 酒店列表数据
      // 将hotelList变成一个计算属性
      // hotelList: [],
      pageIndex: 1,
      pageSize: 5,
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
    searchForm,
    filters,
    hotelitem
  },
  mounted() {
    this.getData();
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
  computed: {
    // 酒店列表数据
    hotelList() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      if (this.hotelData.data) {
        return this.hotelData.data.slice(start, end);
      } else {
        // 预防异步数据没有获取完毕
        return [];
      }
    }
  },
  methods: {
    //区域数据显示隐藏
    showContent() {
      this.isShow = !this.isShow;
      this.areaShow = !this.areaShow;
    },
    //父组件接收城市的区域数据
    location(list, cityName) {
      // console.log(list);
      //城市区域列表
      this.local = list;
      //城市名称
      this.cityName = cityName;
    },
    getData() {
      this.$axios({
        url: "/hotels",
        params: this.$route.query
      }).then(res => {
        this.hotelData = res.data;
        this.total = this.hotelData.total;
        console.log(this.hotelData);
      });
    },
    handleCurrentChange(current) {
      this.pageIndex = current;
    },
    handleSizeChange(size) {
      this.pageSize = size;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
//下拉
.el-icon-d-arrow-left {
  transform: rotate(-90deg);
  color: #ff9900;
  cursor: pointer;
}
//上收
.active {
  transform: rotate(90deg);
  color: #ff9900;
  cursor: pointer;
}
//隐藏
.hiddenArea {
  overflow: hidden;
  height: 38px;
}
// 区域、均价、地图
.wrapper {
  color: #666;
  font-size: 14px;
  margin-bottom: 22px;
  .location {
    span {
      margin-right: 14px;
      flex-wrap: wrap;
      a:hover {
        text-decoration: underline;
        color: #0099ff;
      }
    }
  }
}
//均价
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

.hotel_index {
  width: 1000px;
  margin: 20px auto;
}
.pagination {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>