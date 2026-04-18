import request from '../utils/API'

export function getArticleList() {
  return request({
    url: '/artical/artlist',
    method: 'get'
  })
}

export function uploadArticle() {
  return request({
    url: '/artical/upload',
    method: 'post',
    formData: formData,
    headers: config.headers,
  })
}