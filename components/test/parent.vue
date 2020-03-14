<template>
  <div>
    <parent v-if="parentComment.parent" :parentComment="parentComment.parent"></parent>
    <div class="parentComment">{{parentComment.content}}</div>
  </div>
</template>

<script>
export default {
  name: "parent",
  props: ["parentComment"]
};
</script>

<style lang="less" scope>
.parentComment {
  margin: 30px;
  padding: 10px;
  border: 1px solid skyblue;
}
</style>