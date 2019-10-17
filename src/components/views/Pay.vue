<!--
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-17 15:53:34
 -->
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
import { sessionStorage } from '../../comment/sessionStorage'
import qs from 'qs'
import { Cell, CellGroup, Button, Popup, Area, Icon, Toast } from 'vant'
Vue.use(Cell).use(CellGroup).use(Button).use(Popup).use(Area).use(Toast).use(Icon).use(Toast)
export default {
  name: 'result',
  data () {
    return {
      payData: {
        cTradeNo: '',
        nPayAmt: ''
      },
      loadingShow: false
    }
  },
  mounted () {
    this.payData = {
      cTradeNo: sessionStorage.getItem('cTradeNo'),
      nPayAmt: numberFormat(sessionStorage.getItem('nPayAmt'))
    }
  },
  methods: {
    pay () {
      this.loadingShow = true
      axios.post(api.createOrder, qs.stringify(this.payData))
        .then((data) => {
          if (data.data.code !== 0) {
            this.loadingShow = false
            this.$toast(data.data.msg)
          } else {
            // window.location.href = data.data.data.cpayUrl
            this.loadingShow = false
            let paramsObj = {
              action: data.data.data.params.action,
              json: data.data.data.params.json,
              signature: data.data.data.params.signature
            }
            this.$router.push({name: 'ToPay', params: paramsObj})
          }
        })
    }
  }
}
</script>
