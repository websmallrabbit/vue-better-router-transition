<template>
  <div class="vue-better-router-transition">
    <transition :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive v-if="this.keepAlive===true && $route.meta.keepAlive!==false">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>
<script>
import {noSetPageCount} from './index'
export default {
  name: 'vue-better-router-transition',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      state: {
        routerMap: {},
        pageDirection: 'fade'
      }
    }
  },
  methods: {
    setPageDirection ({dir, to, from}) {
      this.state.pageDirection = dir
      this.state.routerMap['to'] = to.path
      this.state.routerMap['from'] = from.path
    },
    setRouterMap () {
      let dir = this.state.pageDirection
      let to = this.state.routerMap.to.replace(/\//g, '_')
      let from = this.state.routerMap.from.replace(/\//g, '_')
      try {
        if (dir === 'slide-left') {
          // 进入
          this.state.routerMap[from] = document.getElementById(from).scrollTop
        } else if (dir === 'slide-right') {
          // 返回
          if (this.keepAlive === true && this.$route.meta.keepAlive !== false) {
            document.getElementById(to).scrollTop = this.state.routerMap[to]
          }
        } else {
        }
      } catch (error) {
      }
    }
  },
  mounted () {
    const history = window.sessionStorage
    let historyCount = history.getItem('count')
    let toIndex = null
    let fromIndex = null
    this.$router.beforeEach((to, from, next) => {
      toIndex = history.getItem(to.path)
      fromIndex = history.getItem(from.path)
      if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
          this.setPageDirection({dir: 'slide-left', to, from})
        } else {
          this.setPageDirection({dir: 'slide-right', to, from})
        }
      } else {
        if (noSetPageCount.join('').indexOf(to.path) > -1) {
          this.setPageDirection({ dir: 'slide-right', to, from })
        } else {
          ++historyCount
          history.setItem('count', historyCount)
          history.setItem(to.path, historyCount)
          this.setPageDirection({ dir: 'slide-left', to, from })
        }
      }
      if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
      } else {
        next()
      }
    })
  }
}
</script>

<style>
  html,body{width: 100%;height: 100%;}
  .vue-better-router-transition{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .fade-enter-active{
    animation: pageFadeIn 400ms forwards;
  }
  @keyframes pageFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /*路由前进，退出*/

  .slide-left-leave-active {
    animation: pageFromCenterToLeft 400ms forwards;
    z-index: 1;
  }

  /*路由后退，进入*/

  .slide-right-enter-active {
    animation: pageFromLeftToCenter 400ms forwards;
    z-index: 1;
  }

  /*路由后退，退出*/

  .slide-right-leave-active {
    animation: pageFromCenterToRight 400ms forwards;
    z-index: 10;
    box-shadow: -3px 0  5px rgba(0,0,0,.1);
  }

  /*路由前进，进入*/

  .slide-left-enter-active {
    animation: pageFromRightToCenter 400ms forwards;
    z-index: 10;
    box-shadow: -3px 0  5px rgba(0,0,0,.1);
  }

  /*-------------------------------*/

  /*路由前进，进入*/

  @keyframes pageFromRightToCenter {
    from {
      /* left: 100%; */
      transform: translate3d(100%, 0, 0);
      opacity: 1;
    }
    to {
      /* left: 0; */
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  /*路由前进，退出*/

  @keyframes pageFromCenterToLeft {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      /* left:0; */
    }
    to {
      opacity: 0.5;
      transform: translate3d(-20%, 0, 0);
      /* left:-20%; */
    }
  }

  /*路由后退，进入*/

  @keyframes pageFromLeftToCenter {
    from {
      opacity: .5;
      transform: translate3d(-20%, 0, 0);
      /* left: -20%; */
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      /* left: 0; */
    }
  }

  /*路由后退，退出*/

  @keyframes pageFromCenterToRight {
    from {
      /* left: 0; */
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      /* left: 100%; */
      transform: translate3d(100%, 0, 0);
      opacity: 1;
    }
  }
</style>
