<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input type="password" placeholder="确认密码" v-model="form.checkPassword"></el-input>
    </el-form-item>
    <el-button type="primary" class="submit" @click="handleSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        captcha: ""
      },

      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //发送验证码
    handleSendCaptcha() {
      //如果手机号为空
      if (this.form.username == "") {
        this.$message({
          type: "error",
          message: "手机号码不能为空"
        });
        return;
      }
      //如果手机号不为11位
      if (this.form.username.length !== 11) {
        this.$message({
          type: "error",
          message: "手机号码格式错误"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res.data);
        const { code } = res.data;
        this.$confirm(`模拟手机验证码${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    //注册发送请求
    handleSubmit() {
      //这里的...是把this.form剩余的参数拿出来
      const { checkPassword, ...props } = this.form;
      this.$axios({
        url: "/accounts/register",
        method: "post",
        data: props
        // data: {
        //   username: this.form.username,
        //   password: this.form.password,
        //   nickname: this.form.nickname,
        //   captcha: this.form.captcha
        // }
      }).then(res => {
        console.log(res.data);
        if (res.data.token) {
          //1.自动登录
          this.$store.commit("user/setUserInfo", res.data);
          //2.弹窗提示
          this.$message({
            type: "success",
            message: "注册成功,正在跳转页面..."
          });
          //3.延迟跳转页面
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
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
