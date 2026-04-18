import request from '@/utils/request'

export function getArticleList() {
  return request({
    url: '/artical/artlist',
    method: 'get'
  })
}