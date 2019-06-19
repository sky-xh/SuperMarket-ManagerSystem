import req from '@/utils/request'
// 登陆接口

export function checkLogin( params ){
    return req.post('/login/check', params);
}