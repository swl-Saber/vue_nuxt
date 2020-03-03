<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机号"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
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
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名/手机",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      //验证表单
      this.$refs.form.validate(async isValue => {
        if (isValue) {
          try {
            const res = await this.$axios({
              url: "/accounts/login",
              method: "post",
              data: {
                username: this.form.username,
                password: this.form.password
              }
            });
            console.log(res.data);
            const { token } = res.data;
            // console.log(data.token);
            if (token) {
              //这里使用vuex进行存储token
              this.$store.commit("user/setUserInfo", res.data);
              console.log(this.$store.state.user.userInfo.token);
              this.$message({
                type: "success",
                message: "登录成功"
              });
            }
          } catch (error) {
            console.log(error);
            this.$message({
              type: "error",
              message: "登录失败"
            });
          }
        }
      });
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