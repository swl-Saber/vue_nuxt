<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item class="form-item">
      <el-input v-model="form.username" placeholder="用户名/手机号"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button type="primary" class="submit" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      form: {
        username: "",
        password: ""
      },
      //表单规则
      rules: {}
    };
  },
  methods: {
    handleLoginSubmit() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>