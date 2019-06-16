const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Headers", "authorization");
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

// 添加账号`
router.post('/addaccount', (req, res) => {
    let {account, password, region} = req.body;
    let sql = `INSERT INTO account(account, password, region) VALUES('${ account }','${ password }','${ region }')`
    connection.query(sql, (err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code: 0, msg: '账号添加成功!'})
        }else{
            res.send({code: 1, msg: '账号添加失败!'})
        }
    })
})
// 查询账号(分页)
router.get('/accountlists', (req, res) => {
	let {currentpage, pagesize} = req.query;
	let page = (currentpage - 1) * pagesize;
    let sql = `select * from account order by createtime desc limit ${page} , ${pagesize}`;
    connection.query(sql, (err, data) => {
        if(err) throw err;
        if(data.length != 0){
            res.send(data)
        }else{
            res.send(data)
        }
    })
})
// 查询账号总条数
router.get('/querytotal', (req, res) => {
	let sql = `select * from account`;
	connection.query(sql, (err, data) => {
		if(err) throw err;
		res.send(data);
	})
})
// 删除某项
router.get('/delaccount', (req, res) => {
    let { id } = req.query
    let sql = `delete from account where id='${ id }'`
    connection.query(sql, (err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code: 0, msg: '删除成功!'})
        }else{
            res.send({code: 1, msg: '删除失败!'})
        }
    })
})
// 批量删除
router.get('/delchooseitem', (req, res) => {
	let { ids } = req.query;
	let sql = `delete from account where id in (${ ids })`;
	connection.query(sql, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, msg: '批量删除成功!'})
		} else {
			res.send({code: 1, msg: '批量删除失败!'})
		}
	})
})
// 数据回填
router.get('/returndata', (req, res) => {
	let { id } = req.query;
	let sql = `select * from account where id = '${ id }'`;
	connection.query(sql, (err, data) => {
		if (err) throw err;
		if(data.length != 0){
		    res.send(data)
		}else{
		    res.send(data)
		}
	})
})
// 数据修改
router.post('/updateaccount',(req, res) => {
	let {name, region, id} = req.body;
	let sql = `update account set account='${ name }', region='${ region }' where id=${ id }`;
	connection.query(sql, (err, data) => {
		if(err) throw err;
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '修改账号成功!'})
		}else{
			res.send({code: 1, msg: '修改账号失败!'})
		}
	})
})
// 原密码验证
router.post('/oldpass', (req, res) => {
	let { value } = req.body;
	let { password } = req.user;
	if(value === password){
		res.send({code:0, msg: '原密码验证成功!'})
	}else{
		res.send({code:1, msg: '原密码验证失败!'})
		}
	})
// 修改密码
router.post('/modify', (req, res) => {
	// res.send('1')
	let {password} = req.body;
	let { id } = req.user;
	let sql = `update account set password='${ password }' where id=${ id }`;
	// console.log(sql)
	connection.query(sql, (err, data) => {
		if(err) throw err;
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '修改密码成功!'})
		}else{
			res.send({code: 1, msg: '修改密码失败!'})
		}
	})
})
module.exports = router;
