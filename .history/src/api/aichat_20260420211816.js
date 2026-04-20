import request from '../utils/API'
// 发送消息
export function sendMessage(message) {
  return request({
    url: '/aichart',
    method: 'post',
    data: {
      message: message
    }
  })
}

