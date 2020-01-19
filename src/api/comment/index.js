import request from '@/utils/request'

export default {
  /**
   * 获取评价页面初始信息
   * @param params
   */
  getCommentInit (params) {
    return request({
      url: '/app/comment/getCommentInfo',
      method: 'GET',
      params: params
    })
  },
  /**
   * 添加评论
   * @param params
   */
  addComment (params) {
    return request({
      url: '/app/comment/addComment',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: params
    })
  },
  /**
   * 获取评论列表
   * @param params
   */
  getCommentList (params) {
    return request({
      url: '/app/comment/list',
      method: 'GET',
      params: params
    })
  }
}
