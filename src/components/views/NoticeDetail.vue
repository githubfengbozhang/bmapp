<template>
  <div class="noticeDetail">
      <div class='title'>{{dataDetail.noticeTitle}}</div>
      <div v-html="dataDetail.noticeContent" class='content'></div>
      <p class='footer'>{{this.$moment(dataDetail.createTime).format("YYYY-MM-DD")}}</p>
  </div>
</template>

<script>
// import { axiosGet } from '../../comment/http'
// import api from '../../comment/api'
import qs from 'qs'

export default {
  name: 'result',
  data () {
    return {
      dataDetail: {}
    }
  },
  mounted () {
    document.title = '考试公告详情'
    this.dataDetail = qs.parse(this.$route.query.content)
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
