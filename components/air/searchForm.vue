<template>
  <div class="search-form">
    <!-- 头部切换 -->
    <el-row type="flex" class="search-tab">
      <span v-for="(item,index) of tabs" :key="index" :class="{active:currentTab==index}" 
      @click="changeTab(index)">
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 搜索表单 -->
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="search-form-content">
  <el-form-item label="出发城市">
      <!-- input输入框-带建议输入 -->
    <el-autocomplete placeholder="请搜索出发城市" class="el-autocomplete"></el-autocomplete>
  </el-form-item>
  <el-form-item label="到达城市">
    <el-autocomplete placeholder="请搜索到达城市" class="el-autocomplete"></el-autocomplete>
  </el-form-item>
  <el-form-item label="出发时间">
      <!-- 日期选择器 -->
        <el-date-picker
        type="date"
        placeholder="请选择日期" style="width: 100%;">
        </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" style="width:100%">搜索</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
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
      form:{},
      rules:{}
    };
  },
  methods:{
      changeTab(index){
          this.currentTab=index;
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
.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}
</style>