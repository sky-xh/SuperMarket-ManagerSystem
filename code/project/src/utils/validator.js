/* 
 *  工具函数: 表单验证函数
 */

// 1.密码强度验证(3-6位,大小字母数字下划线)
export function passwordValidator(val){
    const reg = /^[a-zA-Z0-9_]{3,6}$/;;
    return reg.test(val);
}

