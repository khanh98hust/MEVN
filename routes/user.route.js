var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
var middleware = require('../middleware/middleware')

//trang dang ky
router.get('/dangky', controller.hienthitrangdk)
router.post('/dangky', middleware.dangky, controller.dangky)

//trang dang nhap
router.get('/dangnhap', controller.trangdangnhap)
router.post('/dangnhap', controller.dangnhap)

// trang đang xuất
router.get('/logout', controller.dangxuat)

module.exports = router;
