import req from '@/utils/request';
// 添加账号
export function addAccount( params ){
    return req.post('/vipaccount/addaccount', params);
}
// 数据加载
export function vipLists( params ){
    return req.get('/vipaccount/viplists', params);
}
// 删除
export function del( params ){
    return req.get('/vipaccount/del', params);
}
// 数据回填
export function returnData( params ){
    return req.get('/vipaccount/returndata', params);
}
// 修改
export function updateData( params ){
    return req.get('/vipaccount/updatedata', params);
}