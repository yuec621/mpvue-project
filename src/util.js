// 工具函数库
import config from './config'
export function get (url,data) {
 return request(url,'GET',data)
}
export function post (url,data) {
  return request(url,'POST',data)
 }
function request(url,method,data){
  return new Promise((reslove, reject) => {
    wx.request({
      data,
      method,
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
