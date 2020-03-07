<template>
  <div class="flight-item">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>东航</span> MU5316
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>20:30</strong>
              <span>白云机场T1</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>2时20分</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>22:50</strong>
              <span>虹桥机场T2</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">810</span>起
        </el-col>
      </el-row>
    </div>
    <!-- 推荐座位信息 -->
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>经济舱</span> | 上海一诺千金航空服务有限公司
            </el-col>
            <el-col :span="5" class="price">￥1345</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：83</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>