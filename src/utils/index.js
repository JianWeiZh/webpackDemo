/**
 * 获取地址栏参数 search、hash参数都可以获取
 * @param name
 * @returns {string}
 */
export const getQueryStringByName = (name) => {
  let result1 = document.location.search.match(new RegExp('[\\?\\&]' + name + '=([^\\&]+)', 'i'))
  let result2 = document.location.hash && document.location.hash.match(new RegExp('[\\?\\&]' + name + '=([^\\&]+)', 'i'))
  let result = result1 || result2
  if (result === null || result.length < 1) {
    return ''
  }
  return result[1]
}

/**
 * 获取原生城市定位cityId
 * @return {string}
 */
const getCityId = () => {
  const cityId = getQueryStringByName('adCode') || sessionStorage.getItem('AdCode')
  if (cityId) sessionStorage.setItem('AdCode', cityId)
  return cityId
}

/**
 * 获取原生城市定位经纬度
 * @return {string}
 */
const getCoordinate = () => {
  const coordinate = sessionStorage.getItem('Coordinate')
  return coordinate
}

const appInfoInit = () => {
  const cityId = getQueryStringByName('adCode') || sessionStorage.getItem('AdCode')
  if (cityId) sessionStorage.setItem('AdCode', cityId)
  const latitude = getQueryStringByName('latitude') || sessionStorage.getItem('latitude')
  if (latitude) sessionStorage.setItem('latitude', latitude)
  const longitude = getQueryStringByName('longitude') || sessionStorage.getItem('longitude')
  if (longitude) sessionStorage.setItem('longitude', longitude)
  const coordinate = latitude && longitude ? `${longitude},${latitude}` : getCoordinate()
  if (coordinate) sessionStorage.setItem('Coordinate', coordinate)
  const channel = getQueryStringByName('channel') || localStorage.getItem('channel')
  if (channel) localStorage.setItem('channel', channel)
  const openId = getQueryStringByName('openId') || localStorage.getItem('openId')
  if (openId) localStorage.setItem('openId', openId)
  const code = getQueryStringByName('code')
  if (code) sessionStorage.setItem('code', code)
}

/**
 * 获取app提供的基础信息 城市定位、经纬度、渠道
 * @type {{adCode: string, latitude: string, channel: string, longitude: string}}
 */
const appInfo = {
  coordinate: getCoordinate(),
  adCode: getQueryStringByName('adCode') || sessionStorage.getItem('AdCode'),
  latitude: getQueryStringByName('latitude') || sessionStorage.getItem('latitude'),
  longitude: getQueryStringByName('longitude') || sessionStorage.getItem('longitude'),
  channel: getQueryStringByName('channel') || localStorage.getItem('channel')
}

/**
 * 判断是否是APP环境
 * @returns {boolean}
 */
const isApp = () => {
  const ua = window.navigator.userAgent
  return ua.indexOf('/Optimus') !== -1
}

/**
 * 判断是否是微信环境
 * @returns {boolean}
 */
const isWechat = () => {
  const ua = window.navigator.userAgent
  return ua.indexOf('MicroMessenger') > -1
}

/**
 * 移除空字符串或者非法字符，返回空字符串 ''
 * 合法参数按原值返回
 * @param obj
 * @return {string|*}
 */
const removeNullOrUndefined = (obj) => {
  if (typeof (obj) === 'undefined' || obj === 'null' || obj === null || obj.length === 0) {
    return ''
  } else {
    const reg = '^[ ]+$' // 匹配全是空格情况
    const re = new RegExp(reg)
    if (re.test(obj)) {
      return ''
    } else {
      return obj
    }
  }
}

/**
 * 获取token
 * @returns {string}
 */
export const getToken = () => {
  const ua = window.navigator.userAgent
  const isOptimusApp = ua.indexOf('/Optimus') !== -1
  return isOptimusApp ? (ua.indexOf('token:') !== -1 && ua.substring(ua.indexOf('token:') + 6)) : localStorage.getItem('token')
}

/**
 * 判断是否登录
 * @return {boolean}
 */
const isLogin = () => {
  return !!localStorage.getItem('token') || !!getToken()
}

/**
 * OOSS缩略图
 * @param width
 * @param height
 */
const thumbOSS = (url, width, height) => {
  if (!url) return url
  const result = `${url}?x-oss-process=image/resize,m_mfit,h_${width},w_${height}`
  return result
}

export default {
  getQueryStringByName,
  isApp,
  isWechat,
  removeNullOrUndefined,
  getCityId,
  appInfoInit,
  appInfo,
  getToken,
  isLogin,
  thumbOSS
}
