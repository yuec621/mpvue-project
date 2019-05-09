// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios=require('axios')
const doubanbook=require('doubanbook')

cloud.init()
async function getDouban(isbn){
  const url="https://book.douban.com/subject_search?search_text"+isbn
  let searchInfo=await axios.get(url)
  // console.log(searchInfo.data)
  //使用正则匹配网页内容
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(searchInfo.data)){
    //数据解密
    let searchData = doubanbook(RegExp.$1)
    console.log(searchData)
  }
}
getDouban("9787533956059")
// 云函数入口函数
exports.main = async (event, context) => {

  const {isbn}=event
  if (isbn) {
    return getDouban(isbn)
  } else {
    return {
      code:-1,
      msg:'请扫描正确的图书'
    }
  }
}