import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/views/Home'
import Examination from '@/components/views/Examination'
import QueryResult from '@/components/views/QueryResult'
import Result from '@/components/views/Result'
import Notice from '@/components/views/Notice'
import NoticeDetail from '@/components/views/NoticeDetail'
import Pay from '@/components/views/Pay'
import ToPay from '@/components/views/ToPay'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/examination',
      name: 'Examination',
      component: Examination
    },
    {
      path: '/queryResult',
      name: 'QueryResult',
      component: QueryResult
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/noticeDetail',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/toPay',
      name: 'ToPay',
      component: ToPay
    }
  ]
})
