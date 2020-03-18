<template>
  <div class="wrapper">
    <el-row type="flex">
      <!-- 价格滑块 -->
      <el-col :span="8" class="price-slider">
        <el-row type="flex" justify="space-between">
          <span>价格</span>
          <span>0-{{price}}</span>
        </el-row>
        <el-row>
          <el-slider v-model="price" :max="4000"></el-slider>
        </el-row>
      </el-col>
      <!-- 住宿等级 -->
      <el-col :span="6">
        <el-row>住宿等级</el-row>
        <el-row>
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              <span>不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                <el-dropdown-item v-for="(item,index) of options.levels" :key="index">
                  <el-checkbox :label="`${item.name}`"></el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <!-- 住宿类型 -->
      <el-col :span="6">
        <el-row>住宿类型</el-row>
        <el-row>
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              <span>不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                <el-dropdown-item v-for="(item,index) of options.types" :key="index">
                  <el-checkbox :label="`${item.name}`"></el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <!-- 酒店设施 -->
      <el-col :span="6">
        <el-row>酒店设施</el-row>
        <el-row>
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              <span>不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                <el-dropdown-item v-for="(item,index) of options.assets" :key="index">
                  <el-checkbox :label="`${item.name}`"></el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <!-- 酒店品牌 -->
      <el-col :span="6">
        <el-row>酒店品牌</el-row>
        <el-row>
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              <span>不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                <el-dropdown-item v-for="(item,index) of options.brands" :key="index">
                  <el-checkbox :label="`${item.name}`"></el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 4000,
      checkedList: [],
      options: {} //选项列表
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.options = data;
    });
  },
  methods: {
    handleCheckedChange() {}
  }
};
</script>

<style lang="less" scoped>
//筛选包裹
.wrapper {
  border: 1px solid #dddddd;
  font-size: 14px;
  color: #666666;
  padding: 5px 0;
}

.el-col {
  border-right: 1px solid #dddddd;
  padding: 5px 20px;
  &:last-child {
    border-right: 0;
  }
}
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
  width: 140px;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  width: 170px;
}

// 多选框按钮
/deep/.el-checkbox__inner {
  border-radius: 7px;
}
</style>
