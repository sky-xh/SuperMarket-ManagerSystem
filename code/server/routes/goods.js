const express = require('express');
const router = express.Router();
const connection = require('./js/connection');

router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "authorization,content-type");
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
	 let {currentpage, pagesize, region, key } = req.query;
	 let sql = `select * from goods where 1=1`;
	 // 拼接条件
	 if(region !== ''){
		 sql += ` and theclass='${region}'`;
	 }
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
 // 销售统计
 router.get('/saletotal', (req, res) => {
	 let item = req.query.params;
	 let [t1, t2] = item;
	 let sql = `select * from total where date between '${t1}' and '${t2}'`
	 connection.query(sql, (err, data) => {
		 if (err) throw err;
		 if(data.length != 0){
		     res.send(data)
		 }else{
		     res.send(data)
		 }
	 })
 })
 // 进货统计
  router.get('/goodstotal', (req, res) => {
 	 let item = req.query.params;
 	 let [t1, t2] = item;
 	 let sql = `select * from total where date between '${t1}' and '${t2}'`
 	 connection.query(sql, (err, data) => {
 		 if (err) throw err;
 		 if(data.length != 0){
 		     res.send(data)
 		 }else{
 		     res.send(data)
 		 }
 	 })
 })
 module.exports = router;