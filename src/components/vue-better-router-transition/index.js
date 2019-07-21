import RouteTransition from './transition'
import Layout from './layout'
import Slider from './slider'

const install = function (Vue) {
  Vue.component(RouteTransition.name, RouteTransition)
  Vue.component(Layout.name, Layout)
  Vue.component(Slider.name, Slider)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
