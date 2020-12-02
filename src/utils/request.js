import axios from 'axios'
import { Notify, Toast } from 'vant'
import {S_OK} from './constant'

const service = axios.create({
  baseURL: '/api',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000, // request timeout
  headers: { 'content-type': 'application/json; charset=utf-8' }
})

let time = ''
let toast = ''
const message = '加载中...'

service.interceptors.request.use(
  config => {
    toast = Toast.loading({
      message: message,
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error, 'request')
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if ((new Date().getTime() - time) / 1000 <= 1 && res.code === S_OK) {
      toast.clear()
    } else if (res.code) {
      toast.clear()
    }
    if (response.status === 200) {
      return res
    } else {
      alert(1)
    }
  },
  error => {
    Toast.clear()
    if (error.config.timeOut === 'timeOut' && JSON.stringify(error).indexOf('timeout of 6000ms exceeded') > -1) {
      Notify({ type: 'danger', message: '请求超时，请稍后再试。', duration: 5000 })
    } else {
      const code = error.response && error.response.status
      if (code === 500) {
        Notify({ type: 'danger', message: '服务内部错误，或是您的网络出现了问题', duration: 5000 })
      } else if (code === 404) {
        Notify({ type: 'danger', message: '路径找不到、服务启动时报错', duration: 5000 })
      } else if (code === 400) {
        Notify({ type: 'danger', message: '参数错误', duration: 5000 })
      } else if (code === 502) {
        Notify({ type: 'danger', message: '服务器作为网关或代理，从上游服务器收到无效响应', duration: 5000 })
      } else if (code === 504) {
        Notify({ type: 'danger', message: '服务器作为网关或代理，但是没有及时从上游服务器收到请求', duration: 5000 })
      } else if (code === 503) {
        Notify({ type: 'danger', message: '亲，当前在线参保人数过多，请稍后再试。', duration: 5000 })
      } else {
        Notify({ type: 'danger', message: '请求异常错误', duration: 5000 })
      }
    }
    return Promise.reject(error)
  }
)
export default service
