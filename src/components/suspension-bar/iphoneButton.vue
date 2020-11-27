<template>
  <div ref="buttonContentRef" :class="['iphone-button-wrapper', {'opacity-active': !!status}]">
    <div>
      <span class="round-1"></span>
      <span class="round-2"></span>
      <span class="round-3"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iphoneButton',
  props: {
    changeOpacity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: false,
      opacity: '',
      flag: false
    }
  },
  watch: {
    changeOpacity (v) {
      this.status = v
    }
  },
  created () {
    this.status = this.changeOpacity
  }
}
</script>

<style scoped>
  .opacity-active {
    opacity: 0.5;
  }
  .iphone-button-wrapper .round-1 {
    display: block;
    position: absolute;
    left: 6px;
    top: 7px;
    width: 38px;
    height: 38px;
    background: #474e59;
    border-radius: 100%;
  }
  .iphone-button-wrapper .round-2 {
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
  .iphone-button-wrapper .round-3 {
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
</style>
