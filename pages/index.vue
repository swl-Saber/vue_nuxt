<template>
  <div class="container">
    <!-- 引入Carousel 走马灯 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item,index) of banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
      background-size:contain contain`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) of options"
            :key="index"
            :class="{active:index===currentOption}"
            @click="handleOption(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <el-row type="flex" align="middle" class="search-input">
          <input
            type="text"
            v-model="searchValue"
            :placeholder="options[currentOption].placeholder"
            @keyup.enter="handleSearch"
          />
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [], //轮播图数据
      options: [
        //搜索tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      currentOption: 0, //当前选中项
      searchValue: "" // 搜索内容
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    async getBanners() {
      try {
        //尝试运行
        const res = await this.$axios({ url: "/scenics/banners" });
        // console.log(res);
        const { data } = res.data;
        this.banners = data;
      } catch (error) {
        //捕捉错误
        console.log(error);
      }
    },
    handleOption(index) {
      this.currentOption = index;
      // 如果切换到机票，直接跳转机票页面
      const item = this.options[this.currentOption];
      if (item.name == "机票") {
        this.$router.push(item.pageUrl);
      }
    },

    handleSearch() {
      //   console.log("发送请求搜索");
      const item = this.options[this.currentOption];
      //跳转时给对应的页面url加上搜索内容参数
      this.$router.push(item.pageUrl + this.searchValue);
    }
  }
};
</script>
<style scoped lang="less">
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

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>