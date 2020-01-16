import axios from 'axios'
import qs from 'qs'
import utils from '@/utils'

import { verifivationUrl } from '@/utils/verificationUrl'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 500000, // 请求超时时间
  // 默认等待请求头格式
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // 请求参数
  params: {
    _appid: 'optimus.m'
  },
  responseType: 'json',
  // 对发送请求前的请求头进行配置
  transformRequest: [function (data, headers) {
    const ct = headers['Content-Type']
    // json 类型
    if (ct && ct.indexOf('application/json') > -1) {
      return JSON.stringify(data)
    }
    // FormData 类型，ie10 +
    if (ct && ct.indexOf('multipart/form-data') > -1) {
      return data
    }
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }]
})
// request 拦截器
service.interceptors.request.use(config => {
  config.headers['authorization'] = utils.getToken()
  config.headers['channel'] = sessionStorage.getItem('channel') || ''
  verifivationUrl(config)
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  async response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // 格式化返回值
    const result = {
      msg: res.message,
      data: res.result,
      code: res.returncode
    }
    // 成功（1.http状态码为200 2.res的code为0） ==> 需要前后台定制好code成功值
    if (res.returncode === 0) {
      return Promise.resolve(result)
    }
    if (Object.prototype.toString.call(res) === '[object Array]') {
      return Promise.resolve(result)
    }
    // 失败(1. http状态码为200 2.res的code非0)

    if (res.returncode === 500) {
      alert(res.message)
    } else if (res.returncode === 10010) {
      const isApp = utils.isApp()
      if (isApp) {
        window.history.go(-1)
        window.Hybrid.login()
      } else {
        sessionStorage.setItem('prevPage', window.location.href)
        window.location.href = `${process.env.VUE_APP_BASE_URL}app/wechatLogin?jumppage=back&channel=${utils.appInfo.channel}&ver=${+new Date()}`
      }
    } else {
      alert(res.message)
      return Promise.resolve(result)
    }

    return Promise.reject(res)
  },
  // 失败 http状态码非200
  error => {
    alert('无法连接网络，请稍后重试')
    return Promise.reject(error)
  }
)

export default service
