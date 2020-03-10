<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderForm :infoData="infoData"></orderForm>
      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
export default {
  data() {
    return {
      infoData:{

      }
    }
  },
  components: {
    orderForm
  },
  mounted() {
    const {id,seat_xid}=this.$route.query
    this.$axios({
      url: `/airs/${id}`,
      method: "get",
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res.data);
      this.infoData=res.data;
    });
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