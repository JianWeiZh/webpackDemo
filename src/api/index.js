import request from '@/utils/request'
const apiList = {
  getOrderList (params) {
    return request({
      url: '/app/orderCenter/getPageOrderList',
      params: params
    })
  },
  delOrder (params) {
    return request({
      url: '/app/orderCenter/delOrderByOrderId',
      method: 'POST',
      params: params
    })
  },
  getFiltrateList (params) {
    return request({
      url: '/app/orderCenter/getBusinessTotalType',
      params: params
    })
  },
  getRedirect (params) {
    return request({
      url: '/app/order/getOrderRedirectInfoNew',
      params: params
    })
  },
  /**
   * 获取订单信息
   * @param params
   */
  getOrderDetail (params) {
    return request({
      // baseURL: 'http://ceshiyapi.aibaoxian.com/mock/109/',
      url: 'app/orderCenter/getOrderDetail',
      params: params
    })
  },
  repeatSendOrder (params) {
    return request({
      url: '/app/orderCenter/reOrder',
      params: params
    })
  },
  /**
   * 取消订单
   * @param params
   */
  cancelOrder (params) {
    return request({
      url: '/app/orderCenter/cancelOrderByOrderId',
      method: 'POST',
      params: params
    })
  },
  /**
   * 物流详情
   * @param params
   */
  logisticsDetail (params) {
    return request({
      url: '/app/logistics/detail',
      method: 'POST',
      params: params
    })
  },
  /**
   * 取消已支付订单
   * @param params
   */
  refundOrder (params) {
    return request({
      url: '/app/orderCenter/cancelPayOrder',
      method: 'POST',
      params: params
    })
  },
  /**
   * 确认下单
   * @param params
   */
  assistCommitOrder (params) {
    return request({
      url: '/app/order/assist/commit',
      method: 'POST',
      params: params
    })
  }
}

export default apiList
