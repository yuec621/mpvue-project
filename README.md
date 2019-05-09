# mpvue-project

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject---npm run dev
cd server----npm run dev

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
# 云开发步骤
1.app.json中设置："cloud":true
2.project.configjson中："cloudfunctionRoot": "cloudFn",
3.建项目：cloudFn----,
4.在main.js中启动云环境：wx.cloud.init(),
5.在具体的项目中调用云函数

```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
