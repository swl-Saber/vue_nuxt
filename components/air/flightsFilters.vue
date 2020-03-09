<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        广州 - 上海
        /
        2019-06-17
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleFilters">
          <el-option
            v-for="(item,index) of totalData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFilters">
          <el-option
            v-for="(item,index) of totalData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleFilters">
          <el-option
            v-for="(item,index) of totalData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleFilters">
          <el-option
            v-for="(item,index) of sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ],
      airport: "",
      flightTimes: "",
      company: "",
      airSize: ""
    };
  },
  props: ["totalData"],
  methods: {
    // 选择机场时候触发
    handleAirport(list) {
      const newFliterData = list.filter(flight => {
        return flight.org_airport_name == this.airport;
      });
      // this.$emit("setFlightList", newFliterData);
      return newFliterData;
    },

    // 选择出发时间时候触发
    handleFlightTimes(list) {
      const [from, to] = this.flightTimes.split(",");
      const newFliterData = list.filter(flight => {
        const start = flight.dep_time.split(":")[0];
        return Number(from) <= Number(start) && Number(to) > Number(start);
      });
      return newFliterData;
      // this.$emit("setFlightList", newFliterData);
    },

    // 选择航空公司时候触发
    handleCompany(list) {
      //过滤出公司名相同的数据，使用自定义事件把过滤的数据传给父组件渲染
      const newFliterData = list.filter(flight => {
        return flight.airline_name == this.company;
      });
      return newFliterData;
      // this.$emit("setFlightList", newFliterData);
    },

    // 选择机型时候触发
    handleAirSize(list) {
      const newFliterData = list.filter(flight => {
        return flight.plane_size == this.airSize;
      });
      return newFliterData;
      // this.$emit("setFlightList", newFliterData);
    },
    //多个过滤器同时触发
    handleFilters(){
      //原始数据
      let newFliterData=this.totalData.flights;
      // 四个函数调用需要进行判断是否有数据，否则筛选一个的时候，会同时触发四个函数，其他函数没有数据就会返回一个空数组
      //1.通过机场过滤器
      if(this.airport){
        newFliterData=this.handleAirport(newFliterData);
        // console.log(newFliterData);
      }
      //2.通过起飞时间过滤器
      if(this.flightTimes){
        newFliterData=this.handleFlightTimes(newFliterData);
        // console.log(newFliterData);
      }
      //3.通过公司过滤器
      if(this.company){
        newFliterData=this.handleCompany(newFliterData);
        // console.log(newFliterData);
      }
      //4.通过机型过滤器
      if(this.airSize){
        newFliterData=this.handleAirSize(newFliterData);
        // console.log(newFliterData);
      }

      this.$emit('setFlightList',newFliterData);
    },
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport="";
      this.flightTimes= "";
      this.company="";
      this.airSize= "";
      this.handleFilters();
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>