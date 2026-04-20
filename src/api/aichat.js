import request from '../utils/API'
// 发送消息
export function sendMessage(message) {
    console.log(message)
  return request({
    url: '/chat/aichart',
    method: 'post',
    data: {
      message: message
    }
  })
}

