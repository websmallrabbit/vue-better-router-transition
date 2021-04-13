import RouteTransition from './transition'
import Layout from './layout'
import Slider from './slider'
let noSetPageCount = []

const install = function (Vue) {
  Vue.component(RouteTransition.name, RouteTransition)
  Vue.component(Layout.name, Layout)
  Vue.component(Slider.name, Slider)
}

const noSetPage = function (val) {
  noSetPageCount = val
}

export {
  noSetPageCount
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  noSetPage
}
