var express = require('express');
var router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "authorization,content-type");
    next();
})

// 添加账号
router.post('/addaccount', (req, res) => {
    let {realname, vipcard, usergroup, idcard, userstatus, phonecall, address, value} = req.body;
    let sql = `INSERT INTO vipaccount(realname, vipcard, usergroup, idcard, userstatus, phonecall, address, value)
	 VALUES('${ realname }','${ vipcard }','${ usergroup }','${ idcard }','${ userstatus }','${ phonecall }','${ address }','${ value }')`
    connection.query(sql, (err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code: 0, msg: '账号添加成功!'})
        }else{
            res.send({code: 1, msg: '账号添加失败!'})
        }
    })
})
// 分页
router.get('/viplists', (req, res) => {
	let {currentpage, pagesize, key } = req.query;
	let sql = `select * from vipaccount where 1=1`;
	// 拼接条件
	if(key !== ''){
			 sql += ` and(realname like '%${key}%' or vipcard like '%${key}%')`
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
	let sql = `select * from vipaccount`;
	connection.query(sql, (err, data) => {
		if(err) throw err;
		res.send(data);
	})
})
// 删除
router.get('/del', (req, res) => {
	let { id } = req.query
	let sql = `delete from vipaccount where id='${ id }'`
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.affectedRows > 0){
	        res.send({code: 0, msg: '删除成功!'})
	    }else{
	        res.send({code: 1, msg: '删除失败!'})
	    }
	})
})
// 数据回填
router.get('/returndata', (req, res) => {
	let { id } = req.query;
	let sql = `select * from vipaccount where id = '${ id }'`;
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
router.get('/updatedata', (req, res) => {
	let {vipcard, realname, id, usergroup, address, phonecall} = req.query;
	let sql = `update vipaccount set 
	vipcard='${ vipcard }', realname='${ realname }', usergroup='${ usergroup }', address='${ address }', phonecall='${ phonecall }' where id=${ id }`;
	connection.query(sql, (err, data) => {
		if(data.affectedRows > 0){
			res.send({code: 0, msg: '修改资料成功!'})
		}else{
			res.send({code: 1, msg: '修改资料失败!'})
		}
	})
})
module.exports = router;