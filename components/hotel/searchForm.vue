<template>
  <div class="input_wrapper">
    <el-form :inline="true" :model="form">
      <!-- 切换城市 -->
      <el-form-item>
        <el-autocomplete
          v-model="form.changeCity"
          :fetch-suggestions="queryCitySearch"
          placeholder="切换城市"
          @select="handleSelect"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <!-- 选择日期 -->
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        ></el-date-picker>
      </el-form-item>
      <!-- 筛选人数input框 -->
      <el-form-item>
        <el-popover placement="bottom-start" width="325" trigger="click">
          <el-input placeholder="人数未定" suffix-icon="el-icon-user" readonly slot="reference"></el-input>
          <div class="select_wrapper">
            <el-row class="select_person" type="flex" justify="space-around">
              <el-col>每间</el-col>
              <el-col>
                <el-select v-model="form.adult" size="mini" @change="handleAdult">
                  <el-option
                    v-for="(item,index) in adultOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col>
                <el-select v-model="form.child" size="mini" @change="handleChild">
                  <el-option
                    v-for="(item,index) in childOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="select_btn" type="flex" justify="end">
              <el-button type="primary" size="small">确定</el-button>
            </el-row>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        changeCity: "",
        date: "",
        child: "0 儿童",
        adult: "2 成人"
      },
      isShow: false,
      adultOptions: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "7",
          label: "7"
        }
      ],
      childOptions: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        }
      ]
    };
  },
  mounted() {
    //进页面时调用一次搜索函数，获取广州市区域数据
    // this.queryCitySearch();
  },
  methods: {
    //获取城市列表
    getCityList(searchValue) {
      if (!searchValue) {
        return;
      }
      return this.$axios({
        url: "/cities",
        params: {
          name: searchValue
        }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;

        //在城市列表添加一个value属性
        let cityList = data.map(city => {
          return { ...city, value: city.name };
        });
        // console.log(cityList);
        return cityList;
      });
    },
    //切换城市输入框获得焦点时触发
    queryCitySearch(searchValue, showList) {
      // searchValue = this.changeCity;
      this.getCityList(searchValue).then(cityList => {
        // console.log(cityList);
        showList(cityList);
      });
    },
    //切换城市时下拉选择时触发
    handleSelect(item) {
      // console.log(item);
      //传城市列表区域的数据给父组件渲染
      this.$emit("location", item.scenics, item.name);
    },
    //查询价格触发
    handleSubmit() {},
    //选择成人人数时触发
    handleAdult(number) {
      this.adult = number + " 成人";
    },
    //选择儿童人数时触发
    handleChild(number) {
      this.child = number + " 儿童";
    }
  }
};
</script>

<style lang="less" scoped>
.input_wrapper {
  .el-form-item {
    &:nth-child(2) {
      margin-right: 0;
    }
  }
  /deep/ .el-range-separator {
    margin-right: 10px;
    padding-left: 8px;
  }
}
/deep/ .el-icon-user {
  font-size: 18px;
}

.select_wrapper {
  z-index: 5;
  .select_person {
    padding-bottom: 22px;
    border-bottom: 1px solid #dddddd;
    color: #606266;
    .el-col {
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .select_btn {
    margin-right: 12px;
    padding-top: 22px;
    .el-button--small {
      padding: 7px 15px;
    }
  }
}
/deep/ .el-popover {
  padding: 0;
}
</style>