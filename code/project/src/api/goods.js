import req from '@/utils/request';
// 添加商品
export function toAddGoods( params ){
    return req.post('/goods/addgoods', params);
}
// 加载商品列表
export function goodsLists( params ){
    return req.get('/goods/goodslists', params);
}
// 删除商品
export function delGoods( params ){
    return req.get('/goods/delgoods', params);
}
// 修改数据回填
export function returnData( params ){
    return req.get('/goods/returndata', params);
}
// 修改商品
export function updateGoods( params ){
    return req.post('/goods/updategoods', params);
}
// 销售统计
export function saleTotal( params ){
    return req.get('/goods/saletotal', params);
}
// 进货统计
export function goodsTotal( params ){
    return req.get('/goods/goodstotal', params);
}