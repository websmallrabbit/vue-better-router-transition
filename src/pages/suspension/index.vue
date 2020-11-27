<template>
  <div class="suspension-bar-wrapper">
    <suspension-bar v-show="!buttonActive" :position="position" @change="change">
      <iphone-button :changeOpacity="changeOpacity"></iphone-button>
    </suspension-bar>
    <button-content v-model="buttonActive"></button-content>
  </div>
</template>

<script>
import SuspensionBar from '../../components/suspension-bar/index'
import IphoneButton from '../../components/suspension-bar/iphoneButton'
import ButtonContent from '../../components/suspension-bar/buttonContent'

export default {
  name: 'Suspension',
  data () {
    return {
      position: {
        top: '0px',
        left: '0px'
      },
      endTime: 1,
      timer: null,
      changeOpacity: false,
      buttonActive: false
    }
  },
  components: {ButtonContent, IphoneButton, SuspensionBar},
  destroyed () {
    document.removeEventListener('click', this.listenClick, false)
  },
  mounted () {
    if (localStorage.getItem('suspensionBar')) {
      this.position = {
        top: JSON.parse(localStorage.getItem('suspensionBar')).top + 'px',
        left: JSON.parse(localStorage.getItem('suspensionBar')).left + 'px'
      }
    }
    this.change()
    this.listenClick()
  },
  methods: {
    change () {
      this.endTime = 1
      this.changeOpacity = false
      clearTimeout(this.timer)
      this.timer = setInterval(() => {
        if (this.endTime >= 3) {
          this.changeOpacity = true
          clearTimeout(this.timer)
        }
        this.endTime++
      }, 1000)
    },
    listenClick () {
      document.addEventListener('click', (e) => {
        console.log(e.target.className, 'e.target.className')
        if (e.target.className.indexOf('suspension-bar-wrapper') !== -1) {
          this.buttonActive = false
        } else if (e.target.className.indexOf('round-1') !== -1 || e.target.className.indexOf('round-2') !== -1 || e.target.className.indexOf('round-3') !== -1 || e.target.className.indexOf('iphone-button-wrapper') !== -1) {
          this.buttonActive = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .suspension-bar-wrapper {
    width: 100%;
    height: 100%;
    /*background: url("../../assets/yuan.jpeg") no-repeat;*/
    /*background: url("../../assets/WechatIMG552.jpeg") no-repeat;*/
    background-size: cover;
  }
  .iphone-button-wrapper {
    width: 50px;
    height: 50px;
    background: #29292c;
    text-align: center;
    line-height: 100px;
    border-radius: 12px;
    position: relative;
  }

</style>
