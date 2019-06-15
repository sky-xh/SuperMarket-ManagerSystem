var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accountsRouter = require('./routes/accounts');
var goodsRouter = require('./routes/goods.js');
var vipaccountRouter = require('./routes/vipaccount.js');
var stockRouter = require('./routes/stock.js');
var salelistsRouter = require('./routes/salelists.js');
var loginRouter = require('./routes/login.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/accounts', accountsRouter);
app.use('/goods', goodsRouter);
app.use('/vipaccount', vipaccountRouter);
app.use('/stock', stockRouter);
app.use('/salelists', salelistsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})


module.exports = app;
