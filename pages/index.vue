<template>
  <div class="container">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item,index) of banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
      background-size:contain contain`"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    async getBanners() {
      const res = await this.$axios({ url: "/scenics/banners" });
      console.log(res);
      const { data } = res.data;
      this.banners = data;
    }
  }
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>