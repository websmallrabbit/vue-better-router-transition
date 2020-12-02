<template>
  <div ref="buttonContentRef" :class="['button-content-wrapper', {'active': buttonActive}]">
    <div :class="['round-wrapper', {'round-wrapper-active': buttonActive}]" @click="handleClick">
      <span class="round-1"></span>
      <span class="round-2"></span>
      <span class="round-3"></span>
    </div>
  </div>
</template>

<script>
import BUS from '@/utils/bus'
export default {
  name: 'ButtonContent',
  props: {
  },
  data () {
    return {
      buttonActive: false
    }
  },
  mounted () {
    if (this.$refs.buttonContentRef) {
      this.$refs.buttonContentRef.style.left = JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
      this.$refs.buttonContentRef.style.top = JSON.parse(localStorage.getItem('suspensionBar')).top + 'px'
    }
    BUS.$on('buttonActive', (v) => {
      this.buttonActive = v
      this.$refs.buttonContentRef.style.opacity = '1'
    })
    BUS.$on('documentActive', (v) => {
      if (v) {
        this.$refs.buttonContentRef.style.opacity = '1'
      } else {
        setTimeout(() => {
          this.$refs.buttonContentRef.style.opacity = '0'
        }, 300)
        this.buttonActive = v
      }
    })
    BUS.$on('changePos', (v) => {
      if (this.$refs.buttonContentRef) {
        this.$refs.buttonContentRef.style.left = JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
        this.$refs.buttonContentRef.style.top = JSON.parse(localStorage.getItem('suspensionBar')).top + 'px'
      }
    })
  },
  methods: {
    handleClick () {
      alert(1)
    }
  }
}
</script>

<style scoped>
  .button-content-wrapper {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #29292c;
    text-align: center;
    line-height: 100px;
    border-radius: 12px;
    opacity: 0;
    transition: all .3s;
    z-index: 998;
  }
  .button-content-wrapper.active {
    position: absolute;
    top: 50% !important;
    left: 50% !important;
    width: 240px;
    height: 240px;
    margin-left: -120px;
    margin-top: -120px;
    background: #29292c;
    text-align: center;
    line-height: 100px;
    border-radius: 12px;
    z-index: 2000;
    opacity: 1;
    transition: all .3s;
  }
  .button-content-wrapper .round-1 {
    display: block;
    position: absolute;
    left: 6px;
    top: 7px;
    width: 38px;
    height: 38px;
    background: #474e59;
    border-radius: 100%;
  }
  .button-content-wrapper .round-2 {
    display: block;
    position: absolute;
    left: 9px;
    top: 10px;
    width: 30px;
    height: 30px;
    background: #555e6c;
    border-radius: 100%;
    border: 1px solid #72727b;
  }
  .button-content-wrapper .round-3 {
    display: block;
    position: absolute;
    left: 13px;
    top: 14px;
    width: 24px;
    height: 24px;
    background: #cbd7e2;
    border-radius: 100%;
    box-sizing: border-box;
  }
  .button-content-wrapper .round-wrapper {
    transition: all .3s;
  }
  .button-content-wrapper .round-wrapper-active {
    transform: translate(95px, 180px);
    transition: all .3s;
  }
</style>
