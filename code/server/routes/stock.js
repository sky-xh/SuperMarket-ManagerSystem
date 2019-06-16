var express = require('express');
var router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
	res.header("Access-Control-Allow-Headers", "authorization");
    next();
})
// 添加库存
router.get('/addstock', (req, res) => {
	let {code, name, number, originprice} = req.query;
	let sql = `INSERT INTO stock(code, name, number, originprice)
	 VALUES('${ code }','${ name }','${ number }','${ originprice }')`
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.affectedRows > 0){
	        res.send({code: 0, msg: '账号添加成功!'})
	    }else{
	        res.send({code: 1, msg: '账号添加失败!'})
	    }
	})
})
// 查询
router.get('/querystock', (req, res) => {
	 let {currentpage, pagesize, key } = req.query;
	 let sql = `select * from stock where 1=1`;
	 // 拼接条件
	 if(key !== ''){
		 sql += ` and(code like '%${key}%' or name like '%${key}%')`
	 }
	 sql+= ` order by id desc`;
	 connection.query(sql, (err, data) => {
		 if(err) throw err;
		 let total = data.length;
		 let page = (currentpage - 1) * pagesize;
		 sql += ` limit ${page} , ${pagesize}`;
		 connection.query(sql, (err, data) => {
			 if(err) throw err;
			 res.send({total, data})
		 })
	 })
 })
// 总条数
router.get('/totallists', (req, res) => {
	let sql = `select * from stock`;
	connection.query(sql, (err, data) => {
		if(err) throw err;
		res.send(data);
	})
})
// 删除
router.get('/del', (req, res) => {
	let { id } = req.query
	let sql = `delete from stock where id='${ id }'`
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.affectedRows > 0){
	        res.send({code: 0, msg: '删除成功!'})
	    }else{
	        res.send({code: 1, msg: '删除失败!'})
	    }
	})
})
// 回填
router.get('/returndata', (req, res) => {
	let { id } = req.query;
	let sql = `select * from stock where id = '${ id }'`;
	connection.query(sql, (err, data) => {
		if (err) throw err;
		if(data.length != 0){
		    res.send(data)
		}else{
		    res.send(data)
		}
	})
})
// 修改
router.get('/updatedata', (req, res) => {
	let {id, code, name, originprice, number} = req.query;
	let sql = `update stock set 
	code='${ code }', name='${ name }', originprice='${ originprice }', number='${ number }' where id=${ id }`;
	connection.query(sql, (err, data) => {
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '修改资料成功!'})
		}else{
			res.send({code: 1, msg: '修改资料失败!'})
		}
	})
})
module.exports = router;