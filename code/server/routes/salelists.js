const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
})

// 查询
router.get('/quertlists', (req, res) => {
	let {currentpage, pagesize} = req.query;
	let page = (currentpage - 1) * pagesize;
	let sql = `select * from salelists order by id desc limit ${page} , ${pagesize}`;
	connection.query(sql, (err, data) => {
	    if(err) throw err;
	    if(data.length != 0){
	        res.send(data)
	    }else{
	        res.send(data)
	    }
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

module.exports = router;