import request from '@/utils/API'

export function getGitHot(){
    return request({
        url:'/githot',
        method:'get'
    })
}