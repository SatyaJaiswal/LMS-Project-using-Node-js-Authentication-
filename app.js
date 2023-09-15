var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware before using routes that rely on sessions
app.use(
  session({
    secret: 'my secret key',
    resave: true,
    saveUninitialized: true,
  })
);

// app.get("/", (req,res)=>{
//   console.log(req.session);
//   console.log(re.session.id);
//   res.send("Hello Satya")
// });

const dbURI = 'mongodb://127.0.0.1:27017/lms'; 

mongoose.connect(dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Require routes
const addteacherRouter = require('./routes/addteacher');
const teacher = require('./routes/teacherdata');
const loginRouter = require('./routes/login');
const teacherloginRouter = require('./routes/teacherlogin');
const addstudentRouter = require('./routes/addstudent');
const studentdataRouter = require('./routes/studentdata');
const teacherindexRouter = require('./routes/teacherindex');

// Use routes
app.use("/", require("./routes/routes"));
app.use("/addteacher", addteacherRouter);
app.use("/teacherdata", teacher);
app.use("/login", loginRouter); // Add this route for login
app.use("/teacherlogin", teacherloginRouter);
app.use("/addstudent", addstudentRouter);
app.use("/studentdata", studentdataRouter);
app.use("/teacherindex", teacherindexRouter);

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
  res.render('error');
  console.log(err);
});

module.exports = app;
