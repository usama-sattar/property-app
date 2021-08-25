var express = require('express');
var path = require('path')
require("dotenv").config();
var mongoose = require('mongoose')
const cors = require("cors");
var usersRouter = require('./routes/users');

var app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credntials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//db connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("database established");
})


app.use(usersRouter);

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
  res.send('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;
