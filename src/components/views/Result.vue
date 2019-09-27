<template>
  <div>
      <div></div>
      <van-cell-group>
        <div class = 'touxiang'>
          <div class = 'touxiangtitle'>
            <span>头像</span>
          </div>
          <div class = 'touxiangcontent'>
            <van-image
              width="3rem"
              height="4.5rem"
              :src="file"
              @click = "openImage()"
            />
          </div>
        </div>
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
        <!-- <van-field
        v-model="examGrade"
        label="报考级别"
        disabled
        /> -->
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
        <!-- <van-field
        v-model="ndataPrice"
        label="资料费用"
        disabled
        /> -->
         <van-field
        v-model="nfraction"
        label="分数"
        disabled
        />
         <van-field
        v-model="cfractionGrade"
        label="分数等级"
        disabled
        />
         <van-field
        v-model="creject"
        label="退回原因"
        disabled
        />
   </van-cell-group>
  </div>
</template>
<script>
import momey from '@uilt/momey'
import { ImagePreview } from 'vant'
export default {
  name: 'result',
  data () {
    return {
      file: '',
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
      nfraction: '',
      cfractionGrade: '',
      creject: '',
      data: {},
      instance_before: ''
    }
  },
  mounted () {
    document.title = '报名查询结果'
    this.data = this.$route.params
    this.payAmt = momey(this.data.params.payAmt)
    this.cworkUnit = this.data.cworkUnit
    this.file = this.data.cidCardImg
    this.creject = this.data.creject
    this.cfractionGrade = this.data.cfractionGrade
    this.nfraction = this.data.nfraction
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
  },
  beforeRouteLeave (to, from, next) {
    if (this.instance_before) {
      this.instance_before.close()
    }
    next()
  },
  methods: {
    openImage () {
      this.instance_before = ImagePreview({
        images: [
          this.file
        ],
        showIndex: false
      })
    }
  }
}
</script>
<style>
  /* .van-image{
    max-height: 4rem;
  } */
  /* .van-image img{
      max-height: 4rem;
  } */
  .van-field__control:disabled {
    color: #2a2a2a !important;
    -webkit-text-fill-color: #2a2a2a !important;
  }
  .touxiangtitle{
      -webkit-box-flex: 0;
      -webkit-flex: none;
      flex: none;
      width: 5.625rem;
  }
  .touxiangtitle span{
        color: #323233;
        font-size: 0.875rem;
        line-height: 1.5rem;
  }
  .touxiang{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.625rem 1rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.875rem;
    line-height: 1.5rem;
    background-color: #fff;
    align-items: center;
  }
  .touxiang::after{
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 1rem;
    border-bottom: 0.0625rem solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .touxiangcontent{
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: left;
    vertical-align: middle;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    }
</style>
