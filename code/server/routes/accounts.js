const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
})
// 添加账号
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
// 查询账号
router.get('/accountlists', (req, res) => {
    let sql = `select * from account order by createtime desc`;
    connection.query(sql, (err, data) => {
        if(err) throw err;
        if(data.length != 0){
            res.send(data)
        }else{
            res.send(data)
        }
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
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '修改账号成功!'})
		}else{
			res.send({code: 1, msg: '修改账号失败!'})
		}
	})
})
module.exports = router;
