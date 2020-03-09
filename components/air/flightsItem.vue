<template>
  <div class="flight-item">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info" @click.native="showSeatList">
        <el-col :span="6">
          <span>{{flights.airline_name}}</span>
          {{flights.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{flights.dep_time}}</strong>
              <span>{{flights.org_airport_name}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{time}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{flights.arr_time}}</strong>
              <span>{{flights.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{flights.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <!-- 推荐座位信息 -->
    <!-- 这里插入内置过渡动画 -->
    <el-collapse-transition>
      <div class="flight-recommend" v-if="isShow">
        <!-- 隐藏的座位信息列表 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          v-for="(item,index) of flights.seat_infos"
          :key="index"
        >
          <el-col :span="4">低价推荐</el-col>
          <el-col :span="20">
            <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
              <el-col :span="16" class="flight-sell-left">
                <span>{{item.group_name}}</span>
                | {{item.supplierName}}
              </el-col>
              <el-col :span="5" class="price">￥{{item.settle_price}}</el-col>
              <el-col :span="3" class="choose-button">
                <el-button type="warning" size="mini" @click="handleChoose(flights.id,item.seat_xid)">选定</el-button>
                <p>剩余：{{item.discount}}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: ["flights"],
  computed: {
    time() {
      const arr = this.flights.arr_time.split(":");
      const dep = this.flights.dep_time.split(":");

      const arrTime = arr[0] * 60 + +arr[1];
      const depTime = dep[0] * 60 + +dep[1];

      let dis = arrTime - depTime;
      //如果减出来是负数，说明已经过了凌晨，需要加多24小时
      if (dis < 0) {
        dis = arrTime + 24 * 60 - depTime;
      }
      let hour = Math.floor(dis / 60);
      let minute = dis % 60;

      return hour + "小时" + minute + "分";
    }
  },
  methods: {
    //控制推荐列表的展开收起
    showSeatList() {
      this.isShow = !this.isShow;
    },
    //点击选定触发跳转订单页和传参
    handleChoose(id,seat_xid){
      console.log(id);
      console.log(seat_xid);
      this.$router.push({
        // path:`/air/order?id=${id}&seat_id=${seat_xid}`
        path:'/air/order',
        query:{
          id,
          seat_xid
        }
      }) 
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>