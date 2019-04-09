// 工具函数库
import config from './config'
export function get (url) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          reslove(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
export function showSuccess(text){
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
  })
}
