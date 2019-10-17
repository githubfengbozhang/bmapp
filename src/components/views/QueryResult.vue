<!--
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-17 10:52:23
 -->
<template class='result'>
    <div>
      <van-cell-group>
        <van-field
          :value="nExamText"
          clickable
          label="考试计划"
          placeholder="请选择考试计划"
          @click="openPicker('cOccupation')"
          required
          disabled
        />
        <van-field
            v-model="cIdCard"
            label="身份证号"
            placeholder="请输入身份证号"
            clearable
            required
        />
        <van-field
            v-model="cName"
            clearable
            label="考生姓名"
            placeholder="请输入考生姓名"
        />
        <van-field
            v-model="cPhone"
            label="考生电话"
            placeholder="请输入考生电话"
            clearable
            type='tel'
        />
        <van-popup v-model="picker" position="bottom">
          <van-picker
          show-toolbar
          :columns="pickColumns"
          @cancel="picker = false"
          @confirm="onConfirm"
        />
        </van-popup>
    </van-cell-group>
    <div class="result-buttom-top"></div>
    <van-button type="info" :loading = 'loadingShow' loading-text="信息查询中..." size='large' @click="query()">立即查询</van-button>
    </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Toast, Dialog } from 'vant'
import { axiosPost, axiosGet } from '../../comment/http'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Toast).use(Dialog).use(ActionSheet)
export default {
  name: 'result',
  data () {
    return {
      picker: false,
      cIdCard: '',
      cName: '',
      cPhone: '',
      pickColumns: [],
      loadingShow: false,
      nExamText: '',
      nExamId: ''
    }
  },
  created () {
    this.getAllExam()
  },
  mounted () {
    document.title = '报考结果查询'
  },
  methods: {
    getAllExam () {
      axiosGet(`${api.allExam}`)
        .then((data) => {
          if (data.code === 0) {
            data.data.map((item) => {
              this.pickColumns.push({'text': item.dictLabel, 'value': item.dictValue})
            })
            data.data.map((item, index) => {
              if (index === 0) {
                this.nExamText = item.dictLabel
                this.nExamId = item.dictValue
              }
            })
          }
        })
    },
    openPicker () {
      this.picker = true
    },
    onConfirm (picker, value, index) {
      this.picker = false
      this.nExamText = picker.text
      this.nExamId = picker.value
    },
    query () {
      // if (this.cName === '') {
      //   this.$toast('考生姓名不能为空')
      //   return false
      // }
      if (this.cIdCard === '' || !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.cIdCard))) {
        this.$toast('请输入正确的身份证号')
        return false
      }
      if (this.cPhone && !(/^1[3456789]\d{9}$/.test(this.cPhone))) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      this.loadingShow = true
      axiosPost(`${api.querySignUp}`, qs.stringify({
        cName: this.cName,
        cIdCard: this.cIdCard,
        cPhone: this.cPhone,
        nExamId: this.nExamId
      }))
        .then((data) => {
          this.loadingShow = false
          if (data.code === 0) {
            this.$router.push({name: 'Result', params: data.data})
          } else {
            this.$toast(data.msg)
            Dialog.alert({
              title: '温馨提示',
              message: data.msg
            })
          }
        })
    }
  }
}
</script>
<style>
  .van-field__control:disabled {
    color: #2a2a2a !important;
    -webkit-text-fill-color: #2a2a2a !important;
  }
</style>
<style lang="scss" scoped src="./index.scss">
</style>
