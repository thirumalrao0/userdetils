var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
  res.header('Access-Control-Allow-Methods',"POST,GET,PUT,DELETE");
  next();

})

const mysql1 = require('mysql2');

const connection = mysql1.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password@7680',
  database: 'test',
});

connection.connect((err)=>
{
  if(err){
    console.log(err)
  }
  else{
    console.log("connected to mysql")
  
  }
})


     

const port=3800
app.listen(port,()=>{
  console.log(`server running at http://localhost:${port}`);
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
