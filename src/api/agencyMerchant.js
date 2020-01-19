import request from '@/utils/request'

// 获取省市区
export function getAllProvince (params) {
  return request({
    url: 'app/region/getAllGroupRegion',
    method: 'get',
    params: params
  })
}

// 代办商家列表
export function entsAndProduct (params) {
  return request({
    url: 'app/order/assist/entsAndProduct',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get',
    params
  })
}

// 补充选择的商家信息
export function orderCenterPolish (params) {
  return request({
    url: 'app/order/assist/polish',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params,
    params: {}
  })
}
// 优惠券支持城市列表
export function couponCityIdStringByOrderId (params) {
  return request({
    url: 'app/couponTicket/couponCityIdStringByOrderId',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params,
    params: {}
  })
}
// 根据城市id获取省份信息
export function getProvinceNameByCityId (params) {
  return request({
    url: 'app/region/getProvinceNameByCityId',
    method: 'post',
    headers: {
      'Content-Type': '\tapplication/json'
    },
    data: params,
    params: {}
  })
}
