import request from '../utils/API'

export function getArticleList() {
  return request({
    url: '/artical/artlist',
    method: 'get'
  })
}

export function uploadArticle(formData,config) {
  return request({
    url: '/artical/upload',
    method: 'post',
    data: formData,
    headers: config.headers,
  })
}