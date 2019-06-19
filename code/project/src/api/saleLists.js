import req from '@/utils/request'
// 数据加载
export function quertLists( params ){
    return req.get('/salelists/quertlists', params);
}
// 总条数
export function totalLists( params ){
    return req.get('/salelists/totallists', params);
}