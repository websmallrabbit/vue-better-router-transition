# vue-better-router-transition
vue-仿微信页面左右切换动画效果，页面刷新不影响,滑动切换页面

## 简介

移动端页面之间的转场动画，仿微信转场动画，支持浏览器刷新无影响，并且可定制滑动切换

## 安装下载

- [下载地址](git@github.com:websmallrabbit/vue-better-router-transition.git)
- `npm i vue-better-router-transition`
- CDN https://unpkg.com/vue-better-router-transition

## 快速使用
1. npm i vue-better-router-transition
2. main.js  
import VueBetterRouterTransition from '@/components/vue-better-router-transition'
VueBetterRouterTransition.noSetPage(['/', 'userCenter']) // 设置初始页面，将来转换场景将从这页开始（此页面，初始不设置session）
Vue.use(VueBetterRouterTransition)
3. app.vue文件里
    <vue-better-router-transition :keepAlive="true"></vue-better-router-transition>   
    默认为缓存可以配置   
    在router/index.js
    中 配置元字段   
    meta: {
       keepAlive: false //不缓存
    }
4. 在layout/index.vue里面配置
5. 
```vue
 path: '/',
  component: index,
  redirect: '/home',
  children: [{
    path: '/home',
    component: r => require(['@/pages/home'], r),
    meta: {
      title: 'home1'
    }
  }
  首页path: '/home' 必须是home
```
```vue
  <router-layout id="__index">
        <router-view></router-view>
        <van-tabbar slot="footer" :fixed="false" v-model="active">
          <van-tabbar-item to="/" icon="shop">标签</van-tabbar-item>
          <van-tabbar-item to="/tab" icon="chat">标签</van-tabbar-item>
          <van-tabbar-item to="/swipe" icon="records">标签</van-tabbar-item>
        </van-tabbar>
      </router-layout>
```
5. 在app.vue里   
`<vue-better-router-transition :keepAlive="true"></vue-better-router-transition>`


router-layout 为插件自带的全局组件，<van-tabbar> 为vant插件，可以替换其他插件  
[使用例子](https://github.com/websmallrabbit/vue-better-router-transition/tree/master/src/pages/index.vue)  
[顶部导航栏使用例子](https://github.com/websmallrabbit/vue-better-router-transition/tree/master/src/pages/address.vue)  
 [滑动切换的例子](https://github.com/websmallrabbit/vue-better-router-transition/tree/master/src/pages/rate.vue)  
    
也可以全局使用  
<vue-slider></vue-slider>

## 交流 & 提问

https://github.com/websmallrabbit/vue-better-router-transition/issues

## 关于作者

- 个人主页
https://websmallrabbit.github.io
###  - 技术公众号： 程序员蜗牛 (关注有学习资料送)
- 收款二维码   
我想可以请喝杯咖啡嘛ヾ(≧O≦)〃嗷~
<center>
<img src='https://webrabbit.oss-cn-beijing.aliyuncs.com/WechatIMG51.jpeg' width="30%">
<img src='https://webrabbit.oss-cn-beijing.aliyuncs.com/zhifubao.jpeg' width="30%">
</center>





