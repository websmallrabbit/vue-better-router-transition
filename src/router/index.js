import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/home',
      children: [{
        path: '/home',
        component: r => require(['@/pages/home'], r),
        meta: {
          title: 'home1'
        }
      }, {
        path: '/tab',
        component: r => require(['@/pages/tab'], r),
        meta: {
          title: 'tab'
        }
      }, {
        path: '/swipe',
        component: r => require(['@/pages/swipe'], r),
        meta: {
          title: 'tab'
        }
      }, {
        path: '/suspension',
        component: r => require(['@/pages/suspension/index'], r)
      }]
    },
    {
      path: '/rate',
      meta: {
        keepAlive: false,
        title: 'rate'
      },
      component: r => require(['@/pages/rate'], r)
    },
    {
      path: '/button',
      component: r => require(['@/pages/button'], r)
    },
    {
      path: '/address',
      component: r => require(['@/pages/address'], r)
    },
    {
      path: '/demo',
      component: r => require(['@/pages/demo'], r)
    }
  ]
})
