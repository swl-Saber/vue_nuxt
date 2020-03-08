<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters></flightsFilters>
        <!-- 航班头部布局 -->
        <flightsListHead></flightsListHead>
        <!-- 航班信息 -->
        <flightsItem :flights="item" v-for="(item,index) of flightsList" :key="index"></flightsItem>
        <!-- Pagination分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalData.total"
        ></el-pagination>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">侧边栏组件</div>
    </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";
export default {
  data() {
    return {
      //机票列表数据, 渲染列表数据
      flightsList: [],
      //获取到的总数据
      totalData: {},
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: 5
    };
  },
  mounted() {
    this.getFlightsData();
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters
  },
  methods: {
    //获取机票总数据
    getFlightsData() {
      // console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        const { flights } = res.data;
        //机票列表
        this.flightsList = flights;
        //机票总数据
        this.totalData = res.data;
        //进页面先加载一遍函数
        this.setCurrentData();
      });
    },
    //pageSize 改变时会触发
    handleSizeChange(value) {
      console.log("每页条数", value);
      this.pageSize = value;
      this.setCurrentData();
    },
    //currentPage 改变时会触发
    handleCurrentChange(value) {
      console.log("当前页", value);
      this.currentPage = value;
      this.setCurrentData();
    },
    //设置点击跳转页数的当前页数据
    setCurrentData() {
      const start = this.pageSize * (this.currentPage - 1);
      const end = this.pageSize * this.currentPage;
      this.flightsList = this.totalData.flights.slice(start, end);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .flights-content {
    width: 745px;
    font-size: 14px;
    .el-pagination {
      text-align: center;
    }
  }
  .aside {
    width: 240px;
  }
}
</style>
