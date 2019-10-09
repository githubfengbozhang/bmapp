<!--
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-09 16:39:58
 -->
<template>
  <form name='payFrom' method='post' :action='this.action'>
    <input type='hidden' name='json' :value='this.json'>
    <input type='hidden' name='signature' :value='this.signature'>
  </form>
</template>
<script>
export default {
  data () {
    return {
      action: '',
      json: '',
      signature: ''
    }
  },
  beforeMount () {
    const {
      action,
      json,
      signature
    } = this.$route.params
    this.action = action
    this.json = json
    this.signature = signature
  },
  mounted () {
    this.$nextTick(() => {
      document.forms[0].submit()
    })
  }
}
</script>
