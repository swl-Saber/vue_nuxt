<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderForm v-if="infoData.id" :infoData="infoData" @ticketPrice="ticketPrice"></orderForm>
      <!-- 侧边栏 -->
      <orderAside v-if="infoData.id" :data="infoData" :totalPrice="totalPrice"></orderAside>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      infoData: {},
      totalPrice: 0 //机票总价格
    };
  },
  components: {
    orderForm,
    orderAside
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${id}`,
      method: "get",
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res.data);
      this.infoData = res.data;
    });
  },
  methods: {
    ticketPrice(totalPrice) {
      this.totalPrice = totalPrice;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>