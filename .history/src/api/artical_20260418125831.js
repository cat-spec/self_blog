import request from '../utils/API'

export function getArticleList() {
  return request({
    url: '/artical/artlist',
    method: 'get'
  })
}