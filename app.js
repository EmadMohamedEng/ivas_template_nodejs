var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressHbs = require('express-handlebars') ;
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var roleRouter = require('./routes/role');


var app = express();
app.use(cors())
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Connected To DB .....')
})

require('./config/passport')

// view engine setup
app.engine('.hbs', expressHbs({
  defaultLayout: 'layout', extname: '.hbs', helpers: {
    add: function (value) {
      return value + 1;
    },
    checkQuantity: function (value) {
      if (value <= 1) {
        return true;
      } else {
        return false;
      }
    }
  }
}))
app.set('view engine', '.hbs');
//app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'Shopping-cart_@?!',
  saveUninitialized: false,
  resave: true,
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/roles', roleRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{layout: false});
});

module.exports = app;
