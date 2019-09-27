<template>
    <div class='firstpage'>
      <img src="../../assets/beijing.jpg" class='firstpage-img'/>
      <div class="firstpage-title">重庆工业职业技术学院报名系统</div>
      <div class='firstpage-menu'>
        <van-row type="flex" justify="center">
         <van-col span="8">
           <a @click="toExamination">
            <img src='../../assets/caidan1.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title">立即报考</div>
           </a>
         </van-col>
         <van-col span="8">
           <router-link to="/queryResult">
            <img src='../../assets/caidan2.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title">报考结果查询</div>
           </router-link>
         </van-col>
         <van-col span="8">
           <router-link to="/notice">
            <img src='../../assets/caidan3.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title">考试公告</div>
           </router-link>
         </van-col>
        </van-row>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Button, Row, Col, Image, Dialog } from 'vant'
import { axiosGet, axiosPost } from '../../comment/http'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Button).use(Row).use(Col).use(Image).use(Dialog)
export default {
  name: 'home',
  data () {
    return {
      hasExaminationPlan: false,
      cexamAddress: '',
      ninSchoolStudentPrice: '',
      ninSchoolWorkersPrice: '',
      nnotInSchoolStudentPrice: '',
      nexamId: '',
      userid: this.$route.query.userid,
      function_id: this.$route.query.function_id,
      authTime: this.$route.query.authTime,
      ticket: this.$route.query.ticket,
      inSchStudent: '' // 是否是在校生
    }
  },
  mounted () {
    document.title = '报名考试系统'
    this.getcheckExam() // 是否可以报考
    this.isStudent() // 学生进入是什么身份
    console.log(`function_id:${this.function_id},authTime:${this.authTime},ticket:${this.ticket},userid:${this.userid}`)
  },
  methods: {
    isStudent () {
      axiosPost(`${api.login}`, qs.stringify({
        userid: this.userid,
        functionId: this.function_id,
        authTime: this.authTime,
        ticket: this.ticket
      }))
        .then((data) => {
          if (data.code === 0) {
            this.inSchStudent = data.data.inSchStudent
          }
        })
    },
    getcheckExam () {
      axiosGet(`${api.checkExamDetail}`)
        .then((data) => {
          if (data.code === 0) {
            this.hasExaminationPlan = true
            window.sessionStorage.setItem('hasExaminationPlan', this.hasExaminationPlan)
            const {
              cexamAddress,
              ninSchoolStudentPrice,
              ninSchoolWorkersPrice,
              nnotInSchoolStudentPrice,
              nexamId
            } = data.data
            this.cexamAddress = cexamAddress
            this.ninSchoolStudentPrice = ninSchoolStudentPrice
            this.ninSchoolWorkersPrice = ninSchoolWorkersPrice
            this.nnotInSchoolStudentPrice = nnotInSchoolStudentPrice
            this.nexamId = nexamId
          } else {
            this.hasExaminationPlan = false
            window.sessionStorage.setItem('hasExaminationPlan', this.hasExaminationPlan)
          }
          if (!JSON.parse(window.sessionStorage.getItem('hasExaminationPlan'))) {
            Dialog.alert({
              title: '温馨提示',
              message: '尚不能报考，请耐心等待...'
            })
          }
        })
    },
    toExamination () {
      const data = {
        cexamAddress: this.cexamAddress,
        ninSchoolStudentPrice: this.ninSchoolStudentPrice,
        ninSchoolWorkersPrice: this.ninSchoolWorkersPrice,
        nnotInSchoolStudentPrice: this.nnotInSchoolStudentPrice,
        nexamId: this.nexamId,
        inSchStudent: this.inSchStudent
      }
      if (JSON.parse(window.sessionStorage.getItem('hasExaminationPlan'))) {
        this.$router.push({name: 'Examination', params: data})
      } else {
        Dialog.alert({
          title: '温馨提示',
          message: '尚不能报考，请耐心等待...'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
