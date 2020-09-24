var express = require('express');
var exphbs = require('express-handlebars');
var CROS = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRouter = require('./routes/user.route');
var sanphamRouter = require('./routes/sanpham.route');
var apiRouter = require('./api/routes/api.route');

var middleware = require('./middleware/middleware');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.listen(9367, () => console.log('server is running...'));
app.use(CROS())

app.use(cookieParser('heloocaccau'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRouter);
app.use('/product', middleware.checklogin, sanphamRouter);
app.use('/api', apiRouter);

// anh khanh khong xao loz = anhKhanhKhongXaoLoz

app.set('view engine', 'hbs');
app.engine('.hbs',exphbs({defaultLayout :'layout',extname: '.hbs'}));

app.get('/', middleware.checklogin, (req, res) => res.render('index',{title :'firstBlood',noidung:'quản lý sản phẩm'}));




