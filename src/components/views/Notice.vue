<template>
  <div class="notice">
    <div class="road">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="10"
        @load="onLoadList"
      >
        <div v-if="dtWinNumberInfos.length > 0" >
          <div v-for="(activity, index) in dtWinNumberInfos"
              :key="index"
              :hide-timestamp="true"
              color="#0bbd87"
              class="allcontent">
              <div class="timeWrapper" @click="handleRoadDetail(activity)">
                <div class="titleText" v-html="activity.noticeTitle"></div>
                <div class="time">{{ activity.createTime }}</div>
              </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, PullRefresh, Divider } from 'vant'
import { axiosGet } from '../../comment/http'
import api from '../../comment/api'
import qs from 'qs'
// import qs from 'qs'
Vue.use(List).use(PullRefresh).use(Divider)
export default {
  name: 'result',
  data () {
    return {
      nullTip: '空空如也~',
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      dtWinNumberInfos: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
    }
  },
  mounted () {
    document.title = '报考结果查询'
    this.getroadList()
  },
  methods: {
    // 获取资源表单列表
    getroadList () {
      const _self = this
      axiosGet(`${api.noticeList}?pageNum=${_self.pageIndex}&pageSize=${_self.pageSize}`).then(response => {
        if (response.data.code === 0) {
          const rows = response.data.rows
          if (rows == null || rows.length === 0) {
            // 加载结束
            _self.upFinished = true
            return
          }
          if (rows.length < _self.pageSize) {
            // 最后一页不足10条的情况
            _self.upFinished = true
          }
          // 处理数据
          if (_self.pageIndex === 1) {
            _self.dtWinNumberInfos = rows
          } else {
            _self.dtWinNumberInfos = _self.dtWinNumberInfos.concat(rows)
          }
        }
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取资源列表异常{' + error + '}',
          type: 'error'
        })
      }).finally(() => {
        _self.isDownLoading = false
        _self.isUpLoading = false
      })
    },
    onDownRefresh () {
      this.pageIndex = 1
      this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getroadList() // 加载数据
    },
    // 上拉加载请求方法
    onLoadList () {
      if (this.upFinished) {
        this.pageIndex++
        this.getroadList()
      }
    },
    // 跳转详情页
    handleRoadDetail (activity) {
      this.$router.push({
        path: 'noticeDetail',
        query: {
          content: qs.stringify(activity)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
