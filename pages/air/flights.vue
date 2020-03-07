<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>过滤条件</div>
        <!-- 航班头部布局 -->
        <flightsListHead></flightsListHead>
        <!-- 航班信息 -->
        <flightsItem :flights="item" v-for="(item,index) of flightsList" :key="index"></flightsItem>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">侧边栏组件</div>
    </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
export default {
  data() {
    return {
      //机票列表数据
      flightsList:[],
      //获取到的总数据
      totalData:{}
    }
  },
  mounted() {
    this.getFlightsList();
  },
  components:{
    flightsListHead,
    flightsItem
  },
  methods: {
    //获取机票列表
    getFlightsList() {
      // console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        const {flights}=res.data;
        this.flightsList=flights;
        this.totalData=res.data;  
      });
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
  }
  .aside {
    width: 240px;
  }
}
</style>
