<template>
  <div class="search-form">
    <!-- 头部切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) of tabs"
        :key="index"
        :class="{ active: currentTab == index }"
        @click="changeTab(index)"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </span>
    </el-row>
    <!-- 搜索表单 -->
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="search-form-content"
    >
      <el-form-item label="出发城市">
        <!-- input输入框-带建议输入 -->
        <el-autocomplete
          v-model="form.departCity"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          :fetch-suggestions="querySearch"
          @select="handleDepartSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.arriveCity"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          :fetch-suggestions="querySearch"
          @select="handleArriveSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- 日期选择器 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="width:100%"
          @click="handleSubmit"
          >搜索</el-button
        >
      </el-form-item>
      <!-- 换 -->
      <div class="change">
        <span @click="handleChange">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入momentjs包，转换日期格式
import moment from "moment";
export default {
  data() {
    return {
      currentTab: 0,
      tabs: [
        {
          name: "单程",
          icon: "iconfont icondancheng"
        },
        {
          name: "往返",
          icon: "iconfont iconshuangxiang"
        }
      ],
      form: {
        departCity: "",
        departCode: "", //城市代号
        arriveCity: "",
        arriveCode: "", //城市代号
        departDate: ""
      },
      rules: {}
    };
  },
  methods: {
    //tab切换时触发
    changeTab(index) {
      // this.currentTab = index;
      if(index==1){
        this.$confirm('目前不接受往返订单，请选择单程票','提示',{
          confirmButtonText:'确认',
          showCancelButton:false,
          type:'warning'
        })
      }
    },
    //出发城市输入框获得焦点时触发
    // queryDepartSearch(searchValue, showList) {
    //   //自带两个参数，第一个是当前输入值，第二个是返回数据并显示列表的回调函数
    //   console.log("当前搜索值为" + searchValue);
    //   //如果没有输入搜索内容，将返回
    //   if (!searchValue) {
    //     return;
    //   }
    //   this.$axios({
    //     url: "/airs/city",
    //     method: "get",
    //     params: {
    //       name: searchValue
    //     }
    //   }).then(res => {
    //     console.log(res.data);
    //     const { data } = res.data;
    //     //显示列表的回调属性必须是value
    //     const cityList = data.map(city => {
    //       return { ...city, value: city.name };
    //     });
    //     showList(cityList);
    //   });
    // },
    //封装输入框获得焦点时触发
    querySearch(searchValue, showList) {
      if (!searchValue) {
        return;
      }
      this.$axios({
        url: "/airs/city",
        method: "get",
        params: {
          name: searchValue
        }
      }).then(res => {
        const { data } = res.data;
        let cityList = data.map(city => {
          return {
            ...city,
            value: city.name.replace(/市$/, "")
          };
        });
        //过滤掉没有sort数据的城市
        cityList = cityList.filter(city => {
          //如果要保留元素应该返回true
          //舍弃元素应该返回false
          if (city.sort) {
            return true;
          } else {
            return false;
          }
          // return city.sort;
        });
        console.log(cityList);

        showList(cityList);
      });
    },
    //出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item);
      this.form.departCode = item.sort;
    },
    //到达城市下拉选择时触发
    handleArriveSelect(item) {
      this.form.arriveCode = item.sort;
    },
    //处理表单发送请求
    handleSubmit() {
      console.log(this.form);
    },
    handleDate(date) {
      console.log(date);
      this.departDate = date;
      //这里引入了moment库
      // this.departDate = moment(date).format("YYYY - MM - DD");
    },
    //出发城市和目标城市切换时触发
    handleChange() {}
  }
};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
  .search-tab {
    span {
      display: block;
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px #eee solid;
      background: #eee;
      cursor: pointer;
    }
    .active {
      border-top-color: orange;
      background: #fff;
    }
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
  .change {
    position: absolute;
    top: 35px;
    right: 15px;
    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: -35px;
      width: 25px;
      height: 1px;
      background: #ccc;
    }
    &:after {
      top: 0;
    }

    &:before {
      top: 60px;
    }
    span {
      display: block;
      position: absolute;
      top: 20px;
      right: 0;
      font-size: 12px;
      background: #999;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;

      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: 10px;
        width: 1px;
        height: 20px;
        background: #ccc;
      }

      &:after {
        top: -20px;
      }

      &:before {
        top: 20px;
      }
    }
  }
}
</style>
