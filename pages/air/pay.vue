<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{ payInfo.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas ref="canvas"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      payInfo: {}
    };
  },
  watch: {
    //解决vuex刷新清空仓库，发送请求无token，页面渲染无数据的问题
    "$store.state.user": function() {
      console.log("这里监听仓库，有数据了立刻加载页面");
      this.loadPage();
    }
  },
  mounted() {
    if (this.$store.state.user.userInfo.token) {
      this.loadPage();
    }
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/airorders/" + this.$route.query.id,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
        this.payInfo = res.data;
        //第一个参数是canvas dom，第二个参数是二维码的字符串，第三个参数是配置选项
        QRCode.toCanvas(this.$refs.canvas, res.data.payInfo.code_url, {
          width: 200
        });
        // 获取二维码完毕，进入轮询状态
        this.checkPay();
      });
    },
    checkPay() {
      this.$axios({
        url: "/airorders/checkpay",
        method: "post",
        data: {
          id: this.$route.query.id,
          nonce_str: this.payInfo.price,
          out_trade_no: this.payInfo.orderNo
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.trade_state == "NOTPAY") {
          setTimeout(() => {
            this.checkPay();
          }, 3000);
        } else {
          this.$message({
            message: res.data.statusTxt
          });
          this.parsePayResult(res.data.statusTxt);
        }
      });
    },
    parsePayResult(result) {
      switch (result) {
        case "SUCCESS":
          console.log("支付成功");
          break;
        case "REFUND":
          console.log("转入退款");
        case "NOTPAY":
          console.log("未支付");
          break;
        case "CLOSED":
          console.log("已关闭");
          break;
        case "REVOKED":
          console.log("已撤销（付款码支付）");
          break;
        case "USERPAYING":
          console.log("用户支付中（付款码支付）");
          break;
        case "PAYERROR":
          console.log("支付失败");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
