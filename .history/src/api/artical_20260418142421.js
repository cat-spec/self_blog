import request from '../utils/API'

export function getArticleList() {
  return request({
    url: '/artical/artlist',
    method: 'get'
  })
}

// 删除文章
export function deleteArticle(id) {
  return request({
    url: '/artical/delete/' + id,
    method: 'delete'
  })
}


//上传文件
export function uploadArticle(formData) {
  return request({
    url: '/artical/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}