
<script>
import {get} from './util'
export default {
  async created () {
    const res = await get('/weapp/demo')
    console.log(123, res)
    //    wx.request({
    //   url: config.host+'/weapp/demo',

    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:function(res) {
    //     console.log(res)
    //   }
    // })
    console.log('小程序启动了')
  }
}
</script>

<style>

</style>
