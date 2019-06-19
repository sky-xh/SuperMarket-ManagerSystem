import req from '@/utils/request'
// 添加库存
export function addStock( params ){
    return req.get('/stock/addstock', params);
}
// 加载列表
export function queryStock( params ){
    return req.get('/stock/querystock', params);
}
// 删除
export function del( params ){
    return req.get('/stock/del', params);
}
// 回填
export function returnData( params ){
    return req.get('/stock/returndata', params);
}
// 修改
export function updateData( params ){
    return req.get('/stock/updatedata', params);
}