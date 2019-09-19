<template>
  <div>
      <div></div>
      <van-cell-group>
        <van-field
        v-model="cname"
        label="考生姓名"
        disabled
        />
        <van-field
        v-model="sex"
        label="性别"
        disabled
        />
        <van-field
        v-model="cphone"
        label="考生电话"
        disabled
        />
        <van-field
        v-model="address"
        label="考试场地"
        disabled
        />
        <van-field
        v-model="payStatusName"
        label="缴费状态"
        disabled
        />
        <van-field
        v-model="statusName"
        label="报名状态"
        disabled
        />
        <van-field
        v-model="examType"
        label="考试类别"
        disabled
        />
        <van-field
        value="原因描述"
        label="报名失败"
        disabled
        />
   </van-cell-group>
  </div>
</template>
<script>
export default {
  name: 'result',
  data () {
    return {
      cname: '',
      sex: '',
      cphone: '',
      address: '',
      payStatusName: '',
      statusName: '',
      examType: '',
      data: {}
    }
  },
  mounted () {
    document.title = '报名查询结果'
    this.data = this.$route.params
    this.cname = this.data.cname
    this.sex = this.data.params.sex
    this.cphone = this.data.cphone
    this.address = this.data.params.address
    this.payStatusName = this.data.params.payStatusName
    this.statusName = this.data.params.statusName
    this.examType = this.data.params.examType
  }
}
</script>
