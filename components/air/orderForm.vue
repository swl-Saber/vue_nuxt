<template>
  <div class="main">
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" :model="{users}">
        <div class="member-info-item" v-for="(user,index) of users" :key="index">
          <el-form-item
            label="乘机人类型"
            :prop="`users[${index}].username`"
            :rules="{required:true,message:'请输入乘机人姓名',trigger:'blur'}"
          >
            <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            label="证件类型"
            :prop="`users[${index}].id`"
            :rules="[{required:true,message:'请输入身份证号码',trigger:'blur'},{ min: 18, max: 18, message: '身份证号码位数不正确', trigger: 'blur' }]"
          >
            <el-input placeholder="证件号码" class="input-with-select" v-model="user.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-checkbox-group v-model="insurances">
          <div class="insurance-item" v-for="(item,index) of infoData.insurances" :key="index">
            <el-checkbox
              :label="item.id"
              border
            >{{item.type}}：￥{{item.price}}/份×1 最高赔付{{item.compensation}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form
          label-width="80px"
          :model="{contactName,contactPhone,captcha}"
          :rules="rulesContact"
        >
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha" :disabled="disabled">{{text}}</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    {{totalPrice}}
  </div>
</template>

<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value.length != 11) {
        return callback(new Error("手机号码长度不正确"));
      }
    };
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], //保险id
      contactName: "",
      contactPhone: "",
      invoice: false,
      captcha: "",
      text: "发送验证码",
      disabled: false,
      rulesContact: {
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  props: ["infoData"],
  computed: {
    //计算机票总价格
    totalPrice() {
      //机票价格*乘机人数量+保险价格*乘机人数量
      const ticketPrice = this.infoData.seat_infos.org_settle_price;
      const usersNum = this.users.length;
      let insurancesPrice = 0;
      this.infoData.insurances.forEach(element => {
        if (this.insurances.indexOf(element.id) > -1) {
          insurancesPrice += element.price;
        }
      });
      // console.log(insurancesPrice);
      const res = ticketPrice * usersNum + insurancesPrice * usersNum;
      console.log(res);
      this.$emit("ticketPrice", res);
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        name: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (this.contactPhone.length != 11) {
        return this.$message.error("请正确输入手机号码");
      }

      //发送验证码设置一个60s倒计时
      let count = 60;
      let second = "s";
      const timer = setInterval(() => {
        this.disabled = true;
        this.text = count + second;
        count--;
        if (count == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.text = "重新发送";
        }
      }, 1000);

      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        console.log(res);
        this.$message.success("手机验证码为" + res.data.code);
      });
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: this.captcha
      };
      this.$axios({
        url: "/airorders",
        method: "post",
        data,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;
  /deep/ .el-form-item__error {
    left: 130px;
  }
  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 25px;
  height: 25px;
  font-size: 30px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>