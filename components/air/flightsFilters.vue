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
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) of totalData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) of totalData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) of totalData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
    handleAirport() {
      const newFliterData = this.totalData.flights.filter(flight => {
        return flight.org_airport_name == this.airport;
      });
      this.$emit("setFlightList", newFliterData);
    },

    // 选择出发时间时候触发
    handleFlightTimes() {
      const [from, to] = this.flightTimes.split(",");
      const newFliterData = this.totalData.flights.filter(flight => {
        const start = flight.dep_time.split(":")[0];
        return Number(from) <= Number(start) && Number(to) > Number(start);
      });
      this.$emit("setFlightList", newFliterData);
    },

    // 选择航空公司时候触发
    handleCompany() {
      //过滤出公司名相同的数据，使用自定义事件把过滤的数据传给父组件渲染
      const newFliterData = this.totalData.flights.filter(flight => {
        return flight.airline_name == this.company;
      });
      this.$emit("setFlightList", newFliterData);
    },

    // 选择机型时候触发
    handleAirSize() {
      const newFliterData = this.totalData.flights.filter(flight => {
        return flight.plane_size == this.airSize;
      });
      this.$emit("setFlightList", newFliterData);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {}
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