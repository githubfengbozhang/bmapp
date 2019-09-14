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
import { axiosGet } from '../../comment/http'
import api from '../../comment/api'
Vue.use(Button).use(Row).use(Col).use(Image).use(Dialog)
export default {
  name: 'home',
  data () {
    return {
      hasExaminationPlan: true
    }
  },
  mounted () {
    document.title = '报名考试系统'
    this.getcheckExam()
  },
  methods: {
    getcheckExam () {
      axiosGet(`${api.checkExam}`)
        .then((data) => {
          this.hasExaminationPlan = false
          window.sessionStorage.setItem('hasExaminationPlan', this.hasExaminationPlan)
          if (data.code === 0) {
            if (window.sessionStorage.getItem('hasExaminationPlan') === 'false') {
              Dialog.alert({
                title: '温馨提示',
                message: '尚不能报考，请耐心等待...'
              })
            }
          }
        })
    },
    toExamination () {
      if (window.sessionStorage.getItem('hasExaminationPlan') !== 'false') {
        this.$router.push({name: 'Examination'})
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
