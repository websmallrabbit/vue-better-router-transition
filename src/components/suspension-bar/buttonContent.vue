<template>
  <div ref="buttonContentRef" :class="['button-content-wrapper', {'active': buttonActive}]">

  </div>
</template>

<script>
import BUS from '@/utils/bus'
export default {
  name: 'ButtonContent',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      buttonActive: false,
      flag: false,
      windowWidth: '',
      windowHeight: ''
    }
  },
  mounted () {
    this.windowWidth = document.documentElement.clientWidth
    this.windowHeight = document.documentElement.clientHeight
    if (this.$refs.buttonContentRef) {
      this.$refs.buttonContentRef.style.left = JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
      this.$refs.buttonContentRef.style.top = JSON.parse(localStorage.getItem('suspensionBar')).top + 'px'
    }
    BUS.$on('changePos', (v) => {
      if (this.$refs.buttonContentRef) {
        this.$refs.buttonContentRef.style.left = JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
        this.$refs.buttonContentRef.style.top = JSON.parse(localStorage.getItem('suspensionBar')).top + 'px'
      }
    })
  },
  watch: {
    value (val) {
      this.buttonActive = val
      if (val) {
        // this.$refs.buttonContentRef.style.left = this.windowWidth / 2 + 'px'
        // this.$refs.buttonContentRef.style.top = this.windowHeight / 2 + 'px'
      } else {
        this.$refs.buttonContentRef.style.left = JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
        this.$refs.buttonContentRef.style.top = JSON.parse(localStorage.getItem('suspensionBar')).top + 'px'
      }
    },
    buttonActive (v) {
      this.$emit('input', v)
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
    opacity: 1;
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
    opacity: 1;
    transition: all .3s;
  }
</style>
