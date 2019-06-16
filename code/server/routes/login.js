const express = require('express');
const router = express.Router();
const connection = require('./js/connection');
// 引入jwt
const jwt = require('jsonwebtoken');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "authorization,content-type");
    next();
})

//////////////////////////////////////////////////////// 合法性验证
// 密钥
const secretKey = 'junnima';
// 引入express-jwt
const expressJwt = require('express-jwt');
// 验证token合法性
router.use(expressJwt({
	secret: secretKey
}).unless({
	path: ['/login/check']	//拦截除此之外的地址
}));
// 路由拦截器
router.use(function(err, req, res, next) {
	if(err.name === 'UnauthorizedError'){
		res.status(401).send('token不合法!');
	}
})
////////////////////////////////////////////////////// 合法性验证结束

router.post('/check', (req, res) => {
	let {account, password} = req.body;
	let sql = `select * from account where account='${ account }' and password='${ password }'`;
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.length){
			// 生成token
			const token = jwt.sign(Object.assign({}, data[0]), secretKey, {expiresIn: 60*60*2});
	        res.send({code: 0, msg: '恭喜您!登陆成功!', token});
	    }else{
	        res.send({code: 1, msg: '登陆失败!请检查用户名和密码!'})
	    }
	})
})
// 获取用户名
router.get('/query', (req, res) => {
	res.send(req.user.account);
})

 module.exports = router;