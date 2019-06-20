import req from '@/utils/request';
// 账号相关接口

// 添加账号
export function addAccount( params ){
    return req.post('/accounts/addaccount', params);
}
// 添加账号重复性验证
export function isRepeat( params ){
    return req.post('/accounts/repeats', params);
}
// 页面刷新加载数据
export function accountLists( params ){
    return req.get('/accounts/accountlists', params);
}
// 删除某项
export function delAccount( params ){
    return req.get('/accounts/delaccount', params);
}
// 批量删除
export function delChooseItem( params ){
    return req.get('/accounts/delchooseitem', params);
}
// 修改数据回填
export function returnData( params ){
    return req.get('/accounts/returndata', params);
}
// 修改数据
export function updateAccount( params ){
    return req.post('/accounts/updateaccount', params);
}
// 查询总条数
export function queryTotal( params ){
    return req.get('/accounts/querytotal', params);
}
// 原密码验证
export function checkOldPass( params ){
    return req.post('/accounts/oldpass', params);
}
// 修改密码
export function passwordModify( params ){
    return req.post('/accounts/modify', params);
} 
// 个人中心加载个人信息
export function loadAccountInfo( params ){
    return req.get('/accounts/accountinfo', params);
}
// 菜单权限
export function checkAuthority(){
    return req.get('/accounts/authority');
}
