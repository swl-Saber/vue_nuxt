<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      国内机票
    </h2>
    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <div>搜索</div>
      <!-- banner广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>
    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col>
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col>
        <i class="iconfont iconbaozheng" style="color:green"></i>
        <span>出行保证</span>
      </el-col>
      <el-col>
        <i class="iconfont icondianhua" style="color:#409EFF"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 特价机票 -->
    <h2 class="sale-title">
      <span class="iconfont icontejiajipiao"></span>
      特价机票
    </h2>
    <div class="sale-pic">
      图片
    </div>
  </section>
</template>

<script>
import searchForm from "@/components/air/searchForm"
export default {
  components:{
    searchForm
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    font-weight: normal;
    margin: 10px 0;
    font-size: 20px;
    color: #ffa500;
    .iconfeiji {
      font-size: 20px;
    }
  }
  .statement {
    margin: 10px 0;
    border: 1px solid #ccc;
    background: #f5f5f5;
    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-right: 1px solid #ccc;
      margin: 10px 0;
      &:last-child {
        border-right: 0;
      }
      i {
        font-size: 30px;
      }
      span {
        padding-left: 5px;
      }
    }
  }
  .sale-title {
    font-weight: normal;
    margin: 10px 0;
    font-size: 20px;
    color: #409EFF;
    .icontejiajipiao {
      font-size: 20px;
    }
  }
}
</style>