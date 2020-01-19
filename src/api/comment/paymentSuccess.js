import request from '@/utils/request'

// 支付成功页数据
export function getOrderMsg (query) {
  return request({
    url: '/app/payment/callback',
    method: 'get',
    params: query
  })
}

// 奖励弹框
export function placeOrderWindow (params) {
  return request({
    url: '/app/eject/placeOrderWindow',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    method: 'POST',
    data: params
  })
}
