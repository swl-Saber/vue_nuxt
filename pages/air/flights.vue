<template>
  <div>机票列表</div>
</template>

<script>
export default {
  mounted() {
    this.getFlightsList();
  },
  methods: {
    //获取机票列表
    getFlightsList() {
      // console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style></style>
