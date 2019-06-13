// 引入mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root', 
	password: 'root',
	database: 'supermarket' 
})

connection.connect();
console.log('链接数据库')
module.exports = connection;