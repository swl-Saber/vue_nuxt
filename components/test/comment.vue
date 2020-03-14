<template>
  <div>
    <parent v-if="comment.parent" :parentComment="comment.parent" ></parent>
    <div class="comment">{{comment.content}}</div>
  </div>
</template>

<script>
import parent from "@/components/test/parent";
export default {
  props: ["comment"],
  components: {
    parent
  }
};
</script>

<style lang="less" scoped>
.comment {
  margin: 10px;
  padding: 10px;
  border: 1px solid #888;
}
</style>