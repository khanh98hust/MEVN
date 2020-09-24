var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

// get(layve) post(gui du lieu len server) put(sua) delete(xoa)

// danh muc san pham
router.get('/danhmuc', controller.hienthidanhmuc);
router.post('/danhmuc', controller.themdanhmuc);

//hien thi san pham
router.get('/sanpham', controller.hienthisp)
router.post('/sanpham', controller.themsp)

// tim kiem
router.get('/search', controller.search)

//sua san pham
router.get('/sua/:id', controller.suasp)
router.post('/sua/:id', controller.update)

// xoa san pham
router.get('/xoa/:id', controller.xoasp)

router.get('/xemsanpham', controller.xemsanpham)
router.post('/xemsanpham', controller.choose)

module.exports = router;




