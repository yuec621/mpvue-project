<template>
 
	<div class="container">
    <div class="userinfo" >
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
	</div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
import {showSuccess,post} from '@/util'
import config from '@/config'

export default {
  //调用云函数
  created(){
     wx.cloud.callFunction({
       name:'login',
       data:{
         a:10,
         b:12
       },
       complete:(res)=>{
         console.log(res)
       }
     })
  },

 
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
  async addBook(isbn){
    // 9787536692930
    //https://book.douban.com/subject_search?search_text=9787536692930

    console.log(isbn)
    const res=await post('/weapp/addbook',{isbn,
    openid:this.userinfo.openId
    })
    if(res.code==0&&res.data.title){
      showSuccess('添加成功',`${res.data.title}添加成功`)
    }
    },

    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
            // console.log(res.result)
          }
        }
      })
    },
    loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
    },
    login () {
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log('没过期的登录', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        qcloud.login({
          success: res => {
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    }
  },
  onShow () {
    wx.showShareMenu()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss'>// npm install node-sass --save-dev
// npm install sass-loader --save-dev
// npm install -g cnpm --registry=https://registry.npm.taobao.org  （安装淘宝镜像）
// cnpm install node-sass  --save （使用淘宝镜像安装node-sass）
.container{
  padding:0 30rpx;

}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>
