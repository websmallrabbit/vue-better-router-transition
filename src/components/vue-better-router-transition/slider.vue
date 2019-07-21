<template>
  <div class="slide" ref='slide' @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'vue-slider',
  data () {
    return {
      startX: 0, // 开始触摸的位置
      lastX: 0, // 滑动时的位置
      endX: 0, // 结束触摸的位置
      disX: 0, // 移动距离
      // lastX: 0, // 上一次X坐标
      lastY: 0, // 上一次Y坐标
      translateX: 'translateX(0px)'
    }
  },
  methods: {
    touchStart: function (ev) {
      ev = ev || event
      if (ev.touches.length === 1) { // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = this.lastX = ev.touches[0].clientX // 记录开始位置
        this.lastY = ev.touches[0].clientX
      }
    },
    touchMove: function (ev) {
      ev = ev || event
      // let slideWidth = this.$refs.slide.offsetWidth // $refs 减少获取dom节点的消耗
      // console.log(ev.targetTouches)
      // console.log(ev.changedTouches)
      if (ev.touches.length === 1) {
        // 实时的滑动的距离-起始位置=实时移动的位置
        this.disX = this.lastX - this.startX
        // 计算两次移动距离Y>X就不启动滑动动画,防止误滑
        var disX = ev.touches[0].clientX - this.lastX
        var disY = ev.touches[0].clientY - this.lastY
        // console.log(disX, disY);
        if (Math.abs(disX) > Math.abs(disY)) {
          this.translateX = 'translateX(' + this.disX + 'px)'
        }
        // 记录一次坐标值
        this.lastX = ev.touches[0].clientX
        this.lastY = ev.touches[0].clientY
      }
    },
    touchEnd: function (ev) {
      ev = ev || event
      let slideWidth = this.$refs.slide.offsetWidth
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX
        this.disX = endX - this.startX
        this.translateX = 'translateX(0px)'
        // 只有滑动大于页面宽度的10分之一距离才触发
        if (Math.abs(this.disX) > (slideWidth / 10)) {
          if (this.disX < 0) {
            this.$emit('change', 'left')
          } else {
            this.$emit('change', 'right')
          }
        }
      }
    }
  }
}

</script>
<style>
  .slide {
    width: 100%;
    height: 100%;
  }
</style>
