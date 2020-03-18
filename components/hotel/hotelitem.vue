<template>
  <div class="hotel-item">
    <el-row type="felx" align="middle" class="hotel-info">
      <!-- 酒店图片 -->
      <el-col :span="7" class="hotel-avatar">
        <img :src="hotel.photos" alt />
      </el-col>
      <!-- 酒店详情 -->
      <el-col :span="10" class="hotel-detail">
        <el-row class="title">
          <div>{{hotel.name}}</div>
        </el-row>
        <el-row class="pingyin">
          <span>{{hotel.alias}}</span>
          <span v-if="hotel.hotellevel">
            <i class="el-icon-medal" v-for="(item,index) of hotel.hotellevel.level" :key="index"></i>
            {{hotel.hoteltype.name}}
          </span>
        </el-row>
        <el-row class="comments" type="flex" align="center">
          <el-rate
            class="star"
            v-model="value"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="star">{{hotel.stars}}分</div>
          <div class="comment">
            <span class="count">{{hotel.all_remarks}}</span>
            条评论
          </div>
          <div>
            <span class="count">10</span>
            篇游记
          </div>
        </el-row>
        <el-row class="local">
          <i class="el-icon-location"></i>
          位于: {{hotel.address}}
        </el-row>
      </el-col>
      <!-- 推荐酒店 -->
      <el-col :span="6" class="hotel-recommend">
        <el-row
          class="other"
          type="flex"
          justify="space-between"
          v-for="(item,index) of hotel.products"
          :key="index"
        >
          <div>{{item.name}}</div>
          <div>
            <span class="price">¥ {{item.price}}</span>起
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["hotel"],
  data() {
    return {
      value: this.hotel.stars
    };
  }
};
</script>

<style lang="less">
.hotel-info {
  // background-color: pink;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .hotel-avatar {
    cursor: pointer;
    img {
      width: 100%;
      height: 190px;
    }
  }
  .hotel-detail {
    padding: 0 20px;
    .title {
      cursor: pointer;
      font-size: 20px;
    }
    .pingyin {
      font-size: 14px;
      color: #a09e9c;
      i {
        color: #ff9900;
      }
    }
    .comments {
      font-size: 14px;
      padding: 10px 0;
      .star {
        color: #ff9d02;
        font-size: 13px;
        i {
          font-size: 20px;
          color: #f7ba2a;
          margin-right: 0;
        }
      }
      .comment {
        padding: 0 30px;
      }
      .count {
        color: #ff9d02;
      }
    }
    .local {
      font-size: 14px;
      color: #686666;
    }
  }
  .hotel-recommend {
    font-size: 14px;
    padding-top: 25px;
    .other {
      cursor: pointer;
      padding: 10px;
      color: #696b6e;
      border-bottom: 1px solid #f2f4f8;
      .price {
        color: #ff9903;
      }
    }
    .other:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>