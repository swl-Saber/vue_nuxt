<template>
  <div class="comment">{{comment.content}}</div>
</template>

<script>
export default {
    props:['comment']
}
</script>

<style lang="less" scoped>
.comment {
  margin: 10px;
  padding: 10px;
  border: 1px solid #888;
}
</style>