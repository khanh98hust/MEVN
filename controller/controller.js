var danhmucDb = require('../models/danhmuc.model')
var sanphamDb = require('../models/sanpham.model');
const {
  json
} = require('body-parser');

module.exports.hienthidanhmuc = async (req, res) => {
  var data = await danhmucDb.find();
  return res.render('product/danhmuc', {
    danhmuc: data
  })
}

module.exports.themdanhmuc = (req, res) => {
  danhmucDb.create(req.body).then(() => res.redirect('/product/danhmuc'))
}

module.exports.hienthisp = async (req, res) => {
  var data = await sanphamDb.find(); //lấy tất cả dữ liệu trong database gán vào data
  var dm = await danhmucDb.find();
  var sp = JSON.parse(JSON.stringify(data));
  return res.render('product/sanpham', {
    sanpham: sp,
    danhmuc: dm
  });
}

module.exports.themsp = (req, res) => {
  sanphamDb.create(req.body).then(() => res.redirect('/product/sanpham'))
}

module.exports.search = async (req, res) => {
  var giatritimkiem = req.query.q;
  var sanpham = await sanphamDb.find(); // sp la tat ca cac san pham
  var sp = JSON.parse(JSON.stringify(sanpham));
  var list = sp.filter(x => x.name.indexOf(giatritimkiem) !== -1);
  res.render('product/xemsanpham', {
    sanpham: list
  })
  console.log(a);
}

module.exports.suasp = async (req, res) => {
  var id = req.params.id; // lay id cua san pham
  var dm = await danhmucDb.find(); // lay tat ca cac danh muc
  sanphamDb.findById(id).then((x) => {
    res.render('product/suasp', {
      value: x,
      danhmuc: dm
    })
  })
}

module.exports.update = (req, res) => {
  var id = req.params.id;
  sanphamDb.findByIdAndUpdate(id, req.body).then(() => res.redirect('/product/xemsanpham'))
}

module.exports.xoasp = (req, res) => {
  var id = req.params.id;
  sanphamDb.findByIdAndDelete(id).then(() => res.redirect('/product/xemsanpham'))
}

module.exports.xemsanpham = async (req, res) => {
  var sanpham = await sanphamDb.find(); //lấy tất cả dữ liệu trong database gán vào data
  var danhmuc = await danhmucDb.find();
  var page = parseInt(req.query.page) || 1; //trang 1 -> page = 2
  var sosanpham1trang = 10;
  var batdau = (page - 1) * sosanpham1trang; // batdau = 10
  var ketthuc = page * sosanpham1trang; // ketthuc = 20
  var tongsotrang = Math.ceil(sanpham.length / sosanpham1trang) // tra vo co 6 sanpham ma 1 trang yeu cau 5 sp 6 / 5

  // chỉ hiển thị 5 trang 
  // moi dau vao no se co trang tu 1 den 5 
  // neu chon trang 1 - 1 2 3 4 5
  //neu chon trang 4 - 2 3 4 5 6
  //neu chon trang 5 - 3 4 5 6 7

  var arr = []; // arr[1, 2, 3, 4] [2 3 4 5 6]

  if (page <= 3) {
    for (var i = 1; i <= 5; i++) {
      arr.push(i)
    }
  } else if (page >= tongsotrang - 2) {
    for (var i = tongsotrang - 4; i <= tongsotrang; i++) {
      arr.push(i)
    }
  } else {
    for (var i = page - 2; i <= page + 2; i++) {
      arr.push(i)
    }
  }

  var pre = page - 1;
  var next = page + 1;

  if (page == tongsotrang) {
    next = null;
  }

  if (page == 1) {
    style = 'disabled'
  } else {
    style = ''
  }

  var sp = JSON.parse(JSON.stringify(sanpham)).slice(batdau, ketthuc);
  return res.render('product/xemsanpham', {
    sanpham: sp,
    danhmuc: danhmuc,
    arr: arr,
    pre: pre,
    next: next,
    style: style
  });
}

module.exports.choose = async (req, res) => {
  var dm = req.body.danhmuc; //quan
  var danhmuc = await danhmucDb.find(); //lay tat ca cac danh muc
  var sanpham = await sanphamDb.find({
    danhmuc: dm
  }); //lay cac san pham ma có danh mục bằng cái đã chọn
  // console.log(sanpham);
  var sp = JSON.parse(JSON.stringify(sanpham));
  return res.render('product/xemsanpham', {
    sanpham: sp,
    danhmuc: danhmuc
  });
}
