<template>
  <div>
    <comment :comment="item" v-for="(item,index) of commentList" :key="index"></comment>
  </div>
</template>

<script>
import comment from "@/components/test/comment";
export default {
  data() {
    return {
      commentList: [
        {
          content: "666"
        },
        {
          content: "555",
          parent: {
            content: "5555555"
          }
        },
        {
          content: "444"
        },
        {
          content: "3",
          parent: {
            content: "2",
            parent: {
              content: "1"
            }
          }
        }
      ]
    };
  },
  components: {
    comment
  }
};
</script>

<style>
</style>