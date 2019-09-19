<template>
  <div>
    <div></div>
    <van-cell-group>
    <van-field
    v-model="payData.cTradeNo"
    label="订单号"
    disabled
    />
    <van-field
    v-model="payData.nPayAmt"
    label="支付金额"
    disabled
    />
   </van-cell-group>
   <van-button type="info" :loading = 'loadingShow' size='large' @click="pay()">支付费用</van-button>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import api from '../../comment/api'
import numberFormat from '../../uilt/momey'
import qs from 'qs'
import { Cell, CellGroup, Button, Popup, Area, Icon, Toast } from 'vant'
Vue.use(Cell).use(CellGroup).use(Button).use(Popup).use(Area).use(Toast).use(Icon).use(Toast)
export default {
  name: 'result',
  data () {
    return {
      payData: {},
      nPayAmt: ''
    }
  },
  mounted () {
    this.payData = this.$route.params
    this.nPayAmt = numberFormat(this.$route.params.nPayAmt)
  },
  methods: {
    pay () {
      axios.post(api.createOrder, qs.stringify(this.payData))
        .then((data) => {
          console.log(data.data.data.cpayUrl)
          if (data.data.code !== 0) {
            this.$toast(data.data.msg)
          } else {
            window.location.href = data.data.data.cpayUrl
          }
        })
    }
  }
}
</script>
