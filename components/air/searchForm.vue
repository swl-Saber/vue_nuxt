<template>
  <div class="search-form">
    <!-- 临时调试 -->
    <ul>
      <li>出发城市: {{form.departCity}}</li>
      <li>出发代码: {{form.departCode}}</li>
      <li>到达城市: {{form.destCity}}</li>
      <li>到达代码: {{form.destCode}}</li>
      <li>出发时间: {{form.departDate}}</li>
    </ul>
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
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="search-form-content">
      <el-form-item label="出发城市">
        <!-- input输入框-带建议输入 -->
        <el-autocomplete
          v-model="form.departCity"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
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
        <el-button type="primary" icon="el-icon-search" style="width:100%" @click="handleSubmit">搜索</el-button>
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
        destCity: "",
        destCode: "", //城市代号
        departDate: ""
      },
      rules: {}
    };
  },
  methods: {
    //tab切换时触发
    changeTab(index) {
      // this.currentTab = index;
      if (index == 1) {
        this.$confirm("目前不接受往返订单，请选择单程票", "提示", {
          confirmButtonText: "确认",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    //封装获取搜索建议函数
    getCityList(searchValue) {
      //自带两个参数，第一个是当前输入值，第二个是返回数据并显示列表的回调函数
      console.log("当前搜索值为" + searchValue);
      //如果没有输入搜索内容，将返回
      if (!searchValue) {
        return;
      }
      return this.$axios({
        url: "/airs/city",
        method: "get",
        params: {
          name: searchValue
        }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        //显示列表的回调属性必须是value
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
        return cityList;
      });
    },
    // 出发城市输入框获得焦点时触发
    queryDepartSearch(searchValue, showList) {
      this.getCityList(searchValue).then(cityList => {
        // console.log(cityList);
        // console.log(cityList[0].sort);
        //如果获取不到任何匹配，显示不支持该城市名
        if (cityList.length > 0) {
          this.form.departCode = cityList[0].sort;
          showList(cityList);
        }else{
          const suggestion=[
            {
              value:'不支持该城市名'
            }
          ]
          showList(suggestion)
        }
      });
    },
    //到达城市输入框获得焦点时触发
    queryDestSearch(searchValue, showList) {
      this.getCityList(searchValue).then(cityList => {
        console.log(cityList[0].sort);
        this.form.destCode = cityList[0].sort;
        // console.log(cityList);
        showList(cityList);
      });
    },
    //出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item);
      this.form.departCode = item.sort;
    },
    //到达城市下拉选择时触发
    handleDestSelect(item) {
      // console.log(item);
      this.form.destCode = item.sort;
    },
    //处理表单发送请求
    handleSubmit() {
      console.log(this.form);
      if (!this.form.departCity) {
        this.$message({
          type: "error",
          message: "请选择出发城市"
        });
        return;
      } else if (!this.form.destCity) {
        this.$message({
          type: "error",
          message: "请选择到达城市"
        });
        return;
      } else if (!this.form.departDate) {
        this.$message({
          type: "error",
          message: "请选择出发时间"
        });
        return;
      }
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    },
    //选择日期触发
    handleDate(date) {
      console.log(date);
      this.departDate = date;
      //这里引入了moment库
      // this.departDate = moment(date).format("YYYY - MM - DD");
    },
    //出发城市和目标城市切换时触发
    handleChange() {
      //先缓存到达城市原来的数据
      const oldDestCity = this.form.destCity;
      const oldDestCode = this.form.destCode;
      //将出发城市赋值给到达城市数据
      this.form.destCity = this.form.departCity;
      this.form.destCode = this.form.departCode;
      //再把缓存的数据赋值给出发城市
      this.form.departCity = oldDestCity;
      this.form.departCode = oldDestCode;
    }
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
