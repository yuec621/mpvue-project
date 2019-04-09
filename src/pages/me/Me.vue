<template>
  <div class="container">
      <p>{{userinfo.openId}}</p>
    <div class="userinfo" @click='login'>
      <img :src='userinfo.avatarUrl' alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId'  @click='scanBook'
     class="btn">添加图书</button>
    <!-- <button open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">点击登录</button> -->
  </div>
</template>
<script>
import qcloud from "wafer2-client-sdk";

import YearProgress from "@/components/YearProgress";
import { get, showSuccess } from "@/util";

import config from "@/config";
export default {
  components: {
    YearProgress
  },
  data() {
    return {
      userinfo: {
        avatarUrl: "../../../static/img/unlogin.png",
        nickName: "点击登录"
      }
    };
  },
  methods: {
    scanBook() {
      // 允许从相机和相册扫码
      wx.scanCode({
        success(res) {
          console.log(res);
        }
      });
    },
    login() {
      let user = wx.getStorageSync("userinfo");
      const self = this;
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: function(userinfo) {
            // console.log("登录成功", userInfo);

            
            qcloud.request({
              url: config.userUrl,
              login: true,
              success(userRes) {
                showSuccess("登陆成功");
                console.log(userRes);
                wx.setStorageSync("userinfo",userRes.data.data);
                self.userinfo = userRes.data.data;
              }
            });
         
          },
          fail: function(err) {
            // console.log("登录失败", err);
          }
        });
      }
    }
  },
  onshow() {
    let userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = userinfo;
    }

    // console.log(this.userinfo);
  }
};
</script>

<style lang='scss'>
// npm install node-sass --save-dev
// npm install sass-loader --save-dev
// npm install -g cnpm --registry=https://registry.npm.taobao.org  （安装淘宝镜像）
// cnpm install node-sass  --save （使用淘宝镜像安装node-sass）
.container {
  padding: 0 30rpx;
}

.userinfo {
  margin-top: 100rpx;
  text-align: center;
  img {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>
