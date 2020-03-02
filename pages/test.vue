<template>
  <div>
    <div class="tabs">
      <span @click="currentTab=0">运动</span>
      <span @click="currentTab=1">电影</span>
      <span @click="currentTab=2">汽车</span>
    </div>
    <div v-if="currentTab==0">这里是运动的内容</div>
    <div v-else-if="currentTab==1">这里是电影的内容</div>
    <div v-else-if="currentTab==2">这里是汽车的内容</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0
    };
  }
};
</script>

<style>
</style>