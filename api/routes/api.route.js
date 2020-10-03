var express = require('express');
var router = express.Router();
var controller = require('../controller/api.controller');

router.get('/product', controller.laysanpham)

router.get('/product/:id', controller.lay1sanpham)

router.delete('/product/:id', controller.xoa1sanpham)

router.post('/user', controller.guidangky)

router.get('/user/:id', controller.getUser)

router.put('/user/:id', controller.updateCart)

router.post('/login', controller.login)

router.post('/friend', controller.addfriend)

module.exports = router;
