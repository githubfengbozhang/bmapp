<template>
  <form name='payFrom' method='post' action='http://school-demo.axinfu.com:8082/paycenter/gateway_web'>
    <input type='hidden' name='json' value='{"business_channel":"cqgateway","orderno":"L2019000000000000012","amt":"0.01","feename":"\u8D75\u654F\u6B63\u5728\u7F34\u8D39\uFF0C\u7F34\u8D39\u91D1\u989D\uFF1A0.01\u5143","back_notify_url":"http://5pyjte.natappfree.cc/paycenter_demo/gatewayWebNotify","front_notify_url":"http://5pyjte.natappfree.cc/paycenter_demo/success.jsp","client_type":"web","pay_channel":"AliPay"}'>
    <input type='hidden' name='signature' value='ae95d3dfcc28c54e73e8ded5632ab40b'>
  </form>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.forms[0].submit()
    })
  }
}
</script>
