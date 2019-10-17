<!--
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-17 14:59:42
 -->
<template>
    <div class='firstpage'>
      <img src="../../assets/beijing.jpg" class='firstpage-img'/>
      <div class="firstpage-title">重庆工业职业技术学院普通话报名系统</div>
      <van-notice-bar
        @click='toNoticeList'
        :text="noticeContent|removeHtml"
        left-icon="volume-o"
      >
      </van-notice-bar>
      <div class='firstpage-menu'>
        <van-row type="flex" justify="center">
         <van-col span="8">
           <a @click="toExamination">
            <img src='../../assets/caidan1.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title"><a style="color:#2c3e50">立即报考</a></div>
           </a>
         </van-col>
         <van-col span="8">
           <router-link to="/queryResult">
            <img src='../../assets/caidan2.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title"><a style="color:#2c3e50">报考结果查询</a></div>
           </router-link>
         </van-col>
         <van-col span="8">
           <router-link to="/notice">
            <img src='../../assets/caidan3.png' class='firstpage-menu-img'/>
            <div class="firstpage-menu-title"><a style="color:#2c3e50">考试公告</a></div>
           </router-link>
         </van-col>
        </van-row>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { removeHtml } from '../../comment/filter'
import { Button, Row, Col, Image, Dialog, NoticeBar } from 'vant'
import { axiosGet, axiosPost } from '../../comment/http'
import setSession from '../../comment/sessionStorage'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Button).use(Row).use(Col).use(Image).use(Dialog).use(NoticeBar).use(removeHtml)
export default {
  name: 'home',
  data () {
    return {
      noticeContent: '',
      hasExaminationPlan: false,
      cexamTitle: '',
      texamBeginTime: '',
      texamEndTime: '',
      cexamAddress: '',
      ninSchoolStudentPrice: '',
      ninSchoolWorkersPrice: '',
      nnotInSchoolStudentPrice: '',
      nexamId: '',
      userid: this.$route.query.userid,
      function_id: this.$route.query.function_id,
      authTime: this.$route.query.authTime,
      ticket: this.$route.query.ticket,
      cStudentNo: this.$route.query.cStudentNo,
      inSchStudent: '' // 是否是在校生
    }
  },
  mounted () {
    document.title = '报名考试系统'
    this.getcheckExam() // 是否可以报考
    this.isStudent() // 学生进入是什么身份
    this.noticeList() // 通知公告
  },
  methods: {
    toNoticeList () {
      this.$router.push({name: 'Notice'})
    },
    noticeList () {
      axiosGet(`${api.noticeList}?pageNum=1&pageSize=1`)
        .then((data) => {
          if (data.data.code === 0) {
            this.noticeContent = `${data.data.rows[0].noticeTitle} ${data.data.rows[0].noticeContent}`
          }
        })
    },
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
              nexamId,
              cexamTitle,
              texamBeginTime,
              texamEndTime
            } = data.data
            this.cexamAddress = cexamAddress
            this.ninSchoolStudentPrice = ninSchoolStudentPrice
            this.ninSchoolWorkersPrice = ninSchoolWorkersPrice
            this.nnotInSchoolStudentPrice = nnotInSchoolStudentPrice
            this.nexamId = nexamId
            this.cexamTitle = cexamTitle
            this.texamEndTime = texamEndTime
            this.texamBeginTime = texamBeginTime
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
        inSchStudent: this.inSchStudent,
        cStudentNo: this.cStudentNo,
        cexamTitle: this.cexamTitle,
        texamEndTime: this.texamEndTime,
        texamBeginTime: this.texamBeginTime
      }
      setSession(data)
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
