<template class='result'>
    <div>
      <van-cell-group>
        <van-field
            v-model="cName"
            required
            clearable
            label="考生姓名"
            placeholder="请输入考生班级"
        />
        <van-field
            v-model="cIdCard"
            label="身份证号"
            placeholder="请输入学生证学号"
            clearable
            required
        />
        <van-field
            v-model="cPhone"
            label="考生电话"
            placeholder="请输入考生联系电话"
            clearable
            required
        />
    </van-cell-group>
    <div class="result-buttom-top"></div>
    <van-button type="info" size='large' @click="query()">立即查询</van-button>
    </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Toast, Dialog } from 'vant'
import { axiosPost } from '../../comment/http'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Toast).use(Dialog).use(ActionSheet)
export default {
  name: 'result',
  data () {
    return {
      cIdCard: '',
      cName: '',
      cPhone: ''
    }
  },
  mounted () {
    document.title = '报考结果查询'
  },
  methods: {
    query () {
      if (this.cName === '') {
        this.$toast('考生姓名不能为空')
        return false
      }
      if (this.cIdCard === '' || !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.cIdCard))) {
        this.$toast('请输入正确的身份证号')
        return false
      }
      if (this.cPhone === '' || !(/^1[3456789]\d{9}$/.test(this.cPhone))) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      axiosPost(`${api.querySignUp}`, qs.parse({
        cName: this.cName,
        cIdCard: this.cIdCard,
        cPhone: this.cPhone
      }))
        .then((data) => {
          if (data.code === 0) {
            if (data.signUpParamEntity) {
              Dialog.alert({
                title: '温馨提示',
                message: '暂未查询到您的报考信息'
              })
                .then(() => {
                  // on close
                })
            }
            this.$router.push({name: 'Result', params: data})
          } else {
            this.$toast(data.msg)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
