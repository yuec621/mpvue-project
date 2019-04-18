const https = require('https');
//新增图书
//1.获取豆瓣信息
//入库
module.exports = async (ctx) => {
      const {
        isbn,
        openid
      } = ctx.request.body
      if (isbn && openid) {
            // let url='https://isbn.market.alicloudapi.com/ISBN?is_info=0&isbn'+isbn
            // const bookinfo=await.getJSON(url)
        //     console.log(bookinfo)
        }
      }

      function getJSON(url) {
        return new Promise((reslove, reject) => {

          https.get(url, res => {
            https.urlData = ''
            res.on('data', data => {
              urlData += data
            })
            res.on('end', data => {
              const bookinfo = JSON.parse(data)
              if (bookinfo.title) {
                reslove(bookinfo)
              }
              reject(bookinfo)
            })

          })

        })
      }
      
    
