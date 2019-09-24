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
        v-model="cidCard"
        label="身份证号"
        disabled
        />
        <van-field
        v-model="address"
        label="考试场地"
        disabled
        />
        <van-field
        v-model="nation"
        label="民族"
        disabled
        />
        <van-field
        v-model="cphone"
        label="考生电话"
        disabled
        />
        <van-field
        v-model="examType"
        label="考生类别"
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
        v-model="payAmt"
        label="考试费用"
        disabled
        />
        <van-field
        v-model="examGrade"
        label="报考级别"
        disabled
        />
        <van-field
        v-model="coccupation"
        label="职业"
        disabled
        />
        <van-field
        v-model="tsignUpTime"
        label="考试时间"
        disabled
        />
        <van-field
        v-model="cworkUnit"
        label="工作单位"
        disabled
        />
        <van-field
        v-model="ndataPrice"
        label="资料费用"
        disabled
        />
   </van-cell-group>
  </div>
</template>
<script>
import momey from '@uilt/momey'
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
      coccupation: '',
      cworkUnit: ',',
      ndataPrice: '',
      tsignUpTime: '',
      examGrade: '',
      payAmt: '',
      nation: '',
      cidCard: '',
      data: {}
    }
  },
  mounted () {
    document.title = '报名查询结果'
    this.data = this.$route.params
    this.payAmt = momey(this.data.params.payAmt)
    this.cworkUnit = this.data.cworkUnit
    this.cname = this.data.cname
    this.coccupation = this.data.coccupation
    this.cphone = this.data.cphone
    this.cidCard = this.data.cidCard
    this.ndataPrice = momey(this.data.ndataPriceLndataPrice)
    this.nation = this.data.params.nation
    this.tsignUpTime = this.data.tsignUpTime
    this.examGrade = this.data.params.examGrade
    this.sex = this.data.params.sex
    this.address = this.data.params.address
    this.payStatusName = this.data.params.payStatusName
    this.statusName = this.data.params.statusName
    this.examType = this.data.params.examType
  }
}
</script>
