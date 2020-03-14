<template>
  <div class="container">
    <breadcrumb></breadcrumb>
    酒店页面
    </div>
</template>

<script>
import breadcrumb from '@/components/hotel/breadcrumb'
export default {
  components:{
    breadcrumb
  }
};
</script>

<style lang="less" scoped>
.container{
  width: 1000px;
  margin: 0 auto;
}
</style>