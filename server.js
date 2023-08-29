const db = require('./app/models')
const userController = require('./app/controllers/user.controller')
const bootcampController = require('./app/controllers/bootcamp.controller')
const express = require('express')
const dotenv = require('dotenv')
const port = 3000;
dotenv.config()
console.log(process.env.DB_PASS)

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./app/routes/user.routes')
const bootcampRouter = require('./app/routes/bootcamp.user')


app.use('/', userRouter)
app.use('/', bootcampRouter)


/* app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("aqui dentro")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 */
module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})