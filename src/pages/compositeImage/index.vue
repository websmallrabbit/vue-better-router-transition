<template>
  <div class="composite-image-wrapper">

  </div>
</template>

<script>
import CompositeImage from 'composite-image'

export default {
  name: 'CompositeImage',
  created () {
    const image = new CompositeImage({
      bgWidth: 300, // 合成后图片的宽度
      bgHeight: 400 // 合成后图片的高度
    })
    const cfg1 = {
      src: 'https://bpic.588ku.com/back_pic/19/04/14/bf310e139cf9fc16b3c032caccf6804a.jpg',
      x: 0,
      y: 0,
      width: 300,
      height: 300
    }

    const cfg2 = {
      src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1805103632,2396162225&fm=26&gp=0.jpg',
      x: 90,
      y: 70,
      width: 116,
      height: 116
    }
    // 合并操作，可支持传入多个图片
    image.composite(cfg1, cfg2).then(() => {
      image.print() // 图片地址dataUrl格式，可传入生成图片类型，默认'png'
      console.log(image, 'image')
      image.download('image.png') // 将已生成图片下载至本地，可传入导出的文件名
    })
  }
}
</script>

<style scoped>

</style>
