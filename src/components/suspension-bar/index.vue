<template>
  <div class="xuanfu" id="moveDiv" :style="position"
       @mousedown="down" @touchstart="down"
       @mousemove="move" @touchmove="move"
       @mouseup="end" @touchend="end"
  >
    <slot></slot>
  </div>
</template>

<script>
import BUS from '@/utils/bus'
export default {
  name: 'SuspensionBar',
  components: {},
  props: {
    // 通过position来设置初始定位
    position: {
      type: Object,
      default: function () {
        return {
          top: '0',
          left: '0'
        }
      }
    },
    // 通过fixed来禁用自由移动
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flags: false,
      positionTemp: { x: 0, y: 0 }, // 记录手指点击的位置
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',
      moveDiv: '',
      windowWidth: '',
      windowHeight: '',
      startY: 0, // 初始位置
      lastY: 0, // 上一次位置
      lastMoveTime: 0, // 用于缓动的变量
      lastMoveStart: 0, // 用于缓动的变量
      stopInertiaMove: false // 是否停止缓动
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    // 实现移动端拖拽
    down () {
      if (this.fixed) {
        return
      }

      this.flags = true
      var touch
      // 该if判断是用touch还是mouse来移动
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.positionTemp.x = touch.clientX // 手指点击后的位置
      this.positionTemp.y = touch.clientY
      this.moveDiv = document.getElementById('moveDiv')
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
      this.dx = this.moveDiv.offsetLeft // 移动的div元素的位置
      this.dy = this.moveDiv.offsetTop
      /**
       * 缓动代码
       */
      this.lastY = this.startY = event.touches[0].pageY
      this.lastMoveStart = this.lastY
      this.lastMoveTime = event.timeStamp || Date.now()
      this.stopInertiaMove = true
    },
    move () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.positionTemp.x // 手指移动的变化量
        this.ny = touch.clientY - this.positionTemp.y

        this.xPum = this.dx + this.nx // 移动后，div元素的位置
        this.yPum = this.dy + this.ny

        if (this.xPum > 0 && (this.xPum + this.moveDiv.clientWidth < this.windowWidth)) {
          // movediv的左右边，未出界
          this.moveDiv.style.left = this.xPum + 'px'
        } else if (this.xPum <= 0) {
          // 左边出界，则左边缘贴边
          this.moveDiv.style.left = 0 + 'px'
        } else if (this.xPum + this.moveDiv.clientWidth >= this.windowWidth) {
          // 右边缘出界
          this.moveDiv.style.left = (this.windowWidth - this.moveDiv.clientWidth) + 'px'
          // console.log("dx", windowWidth - moveDiv.clientWidth)
        }
        // 上下未出界
        if (this.yPum > 0 && (this.yPum + this.moveDiv.clientHeight < this.windowHeight)) {
          this.moveDiv.style.top = this.yPum + 'px'
        } else if (this.yPum <= 0) {
          // 上边缘出界
          this.moveDiv.style.top = 20 + 'px'
        } else if (this.yPum + this.moveDiv.clientHeight >= this.windowHeight) {
          // 下边缘
          this.moveDiv.style.top = this.windowHeight - this.moveDiv.clientHeight - 20 + 'px'
        }

        /**
         * 缓动代码
         */
        let nowY = event.touches[0].pageY
        let moveY = nowY - this.lastY
        let contentTop = this.moveDiv.getBoundingClientRect().top
        console.log(contentTop, 'contentTop')
        // 设置top值移动content
        this.moveDiv.style.top = (parseInt(contentTop) + moveY) + 'px'
        this.lastY = nowY
        let nowTime = event.timeStamp || Date.now()
        this.stopInertiaMove = true
        if (nowTime - this.lastMoveTime > 300) {
          this.lastMoveTime = nowTime
          this.lastMoveStart = nowY
        }

        // 阻止页面的滑动默认事件，为了只让悬浮球滑动，其他部分不滑动；如果碰到滑动问题，1.2 请注意是否获取到 touchmove, 系统默认passive: true，无法使用preventDefault
        document.addEventListener('touchmove', this.preventDefault, { passive: false })
        document.addEventListener('mousemove', this.preventDefault, { passive: false })
      }
    },
    // 鼠标释放时候的函数，鼠标释放，移除之前添加的侦听事件，将passive设置为true，不然背景会滑动不了
    changeNumLeft (startN, endN, speed = 20) {
      let aniTimer = null
      clearInterval(aniTimer)
      let next = 0
      next = Math.floor(startN - speed)
      aniTimer = setInterval(() => {
        next -= speed
        this.moveDiv.style.left = next + 'px'
        if (next <= endN) {
          clearInterval(aniTimer)
          this.moveDiv.style.left = 0 + 'px'
          this.flags = false
          const suspensionBar = {
            left: this.moveDiv.getBoundingClientRect().left,
            top: this.moveDiv.getBoundingClientRect().top
          }
          localStorage.setItem('suspensionBar', JSON.stringify(suspensionBar))
          BUS.$emit('changePos', true)
          this.$emit('change')
        }
      }, 16.7)
      return next
    },
    changeNumRight (startN, endN, speed = 20) {
      console.log(startN, endN)
      let aniTimer = null
      clearInterval(aniTimer)
      let next = startN
      aniTimer = setInterval(() => {
        this.moveDiv.style.left = next + 'px'
        if (next >= endN) {
          clearInterval(aniTimer)
          this.moveDiv.style.left = this.windowWidth - this.moveDiv.clientWidth + 'px'
          this.flags = false
          const suspensionBar = {
            left: this.moveDiv.getBoundingClientRect().left <= this.windowWidth - 50 ? this.moveDiv.getBoundingClientRect().left : this.windowWidth - 50,
            top: this.moveDiv.getBoundingClientRect().top
          }
          localStorage.setItem('suspensionBar', JSON.stringify(suspensionBar))
          BUS.$emit('changePos', true)
          this.$emit('change')
          this.moveDiv.style.left = this.moveDiv.getBoundingClientRect().left <= this.windowWidth - 50 ? this.moveDiv.getBoundingClientRect().left + 'px' : this.windowWidth - 50 + 'px'
        }
        next += speed
      }, 16.7)
      return next
    },
    end () {
      if (this.moveDiv.getBoundingClientRect().left + this.moveDiv.clientWidth / 2 < this.windowWidth / 2) {
        this.changeNumLeft(this.moveDiv.getBoundingClientRect().left, 0)
      } else if (this.moveDiv.getBoundingClientRect().left + this.moveDiv.clientWidth / 2 > this.windowWidth / 2) {
        this.changeNumRight(this.moveDiv.getBoundingClientRect().left, this.windowWidth - this.moveDiv.clientWidth)
      }

      /**
       * 缓动代码
       */
      let nowY = event.changedTouches[0].pageY
      console.log(event.changedTouches[0].pageY, 'e.touches[0]')
      let moveY = nowY - this.lastY
      let contentTop = this.moveDiv.getBoundingClientRect().top
      let contentY = (parseInt(contentTop) + moveY)
      // 设置top值移动content
      this.moveDiv.style.top = contentY + 'px'
      this.lastY = nowY
      let nowTime = event.timeStamp || Date.now()
      let v = (nowY - this.lastMoveStart) / (nowTime - this.lastMoveTime) // 最后一段时间手指划动速度
      this.stopInertiaMove = false;

      (function (v, startTime, contentY) {
        var dir = v > 0 ? -1 : 1 // 加速度方向
        var deceleration = dir * 0.0006
        var duration = v / deceleration // 速度消减至0所需时间

        console.log(v, deceleration, duration, 'duration')
        // let dist = v * duration / 2 // 最终移动多少
        // console.log(dist, 'dist')
        function inertiaMove () {
          if (this.stopInertiaMove) return
          let nowTime = event.timeStamp || Date.now()
          let t = nowTime - startTime
          let nowV = v + t * deceleration
          // 速度方向变化表示速度达到0了
          if (dir * nowV < 0) {
            return
          }
          let moveY = (v + nowV) / 2 * t
          this.moveDiv.style.top = (contentY + moveY) + 'px'
          setTimeout(inertiaMove, 10)
        }
        inertiaMove()
      })(v, nowTime, contentY)

      // 注意事项，在添加和删除监听事件时，其function必须是同名的函数，不能为匿名函数。
      document.removeEventListener('touchmove', this.preventDefault, false)
      document.removeEventListener('mousemove', this.preventDefault, false)
      // 下面两句是保证在移除监听事件后，除了悬浮球的部分还能够滑动，如果不添加，则无法滑动
      document.addEventListener('touchmove', function (e) {
        window.event.returnValue = true
      })
      document.addEventListener('mousemove', function (e) {
        window.event.returnValue = true
      })
      // BUS.$emit('down', true)
    },
    preventDefault (e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
  .xuanfu {
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 999;
    position: fixed;
  }
</style>
