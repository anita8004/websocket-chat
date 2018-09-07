var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SocketHander = require('./socket/index.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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



io.on('connection', async (socket) => {
  console.log('a user connected');
  socketHander = new SocketHander();
  socketHander.connect();
  const history = await socketHander.getMessages()
  const socketid = socket.id
  io.to(socketid).emit("history", history);
//  io.emit("history", history);
  socket.on("message", (obj) => {
    socketHander.storeMessages(obj);
    io.emit("message", obj);
  });
  io.on('disconnection', () => {
    console.log("a user go out");
  })
})

server.listen(3001)

module.exports = app;