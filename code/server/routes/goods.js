const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
})
 // 添加商品
 router.post('/addgoods', (req, res) => {
     let {
		 theclass,
          code,
          name,
          saleprice,
          price,
          originprice,
          number,
          weight,
          unit,
          preferential,
          promote,
          introduce,
	 } = req.body;
     let sql = `INSERT INTO goods(theclass,code,name,saleprice,price,originprice,number,weight,unit,preferential,promote,introduce) VALUES('${ theclass }','${ code }','${ name }','${ saleprice }','${ price }','${ originprice }','${ number }','${ weight }','${ unit }','${ preferential }','${ promote }','${ introduce }')`;
     connection.query(sql, (err, data) => {
         if(err) throw err;
         if(data.affectedRows > 0){
             res.send({code: 0, msg: '商品添加成功!'})
         }else{
             res.send({code: 1, msg: '商品添加失败!'})
         }
     })	
 })
 // 加载商品列表
 router.get('/goodslists', (req, res) => {
	 let {currentpage, pagesize} = req.query;
	 let page = (currentpage - 1) * pagesize;
	 let sql = `select * from goods order by id desc limit ${page} , ${pagesize}`;
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
 	let sql = `select * from goods`;
 	connection.query(sql, (err, data) => {
 		if(err) throw err;
 		res.send(data);
 	})
 })
 // 删除某项
 router.get('/delgoods', (req, res) => {
     let { id } = req.query
     let sql = `delete from goods where id='${ id }'`
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
 	let sql = `select * from goods where id = '${ id }'`;
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
 router.post('/updategoods',(req, res) => {
 	let {code,
          name,
          theclass,
          price,
          saleprice,
          number,
          id} = req.body;
 	let sql = `update goods set code='${ code }', name='${ name }', theclass='${ theclass }', price='${ price }', saleprice='${ saleprice }', number='${ number }' where id=${ id }`;
 	connection.query(sql, (err, data) => {
 		if(data.affectedRows > 0){
 			res.send({code: 0, msg: '商品修改成功!'})
 		}else{
 			res.send({code: 1, msg: '商品修改失败!'})
 		}
 	})
 })
 module.exports = router;