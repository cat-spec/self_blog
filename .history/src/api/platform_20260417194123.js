import request from '../utils/API'

// 获取git热力图
export function getPlatformStats(){
    return request({
        url:'/platform',
        method:'get'
    })
}

