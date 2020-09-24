var userDb = require('../models/user.model')

// controller dang ky
module.exports.hienthitrangdk = (req, res)=>{
  res.render('user/dangky');
}

module.exports.dangky = async (req, res)=> {
  await userDb.create(req.body);
  return res.redirect('/user/dangnhap')
}


//controller dang nhap
module.exports.trangdangnhap = (req, res)=>{
  return res.render('user/dangnhap')
}

module.exports.dangnhap = async (req, res) => {
  var user = await userDb.findOne({username : req.body.username}) //tim tai khoản xem có trong database ko
  if(user !== null){ // nếu có
    if(user.password == req.body.password){ // kiểm tra password
      res.cookie('username', user.id,{ //set cookie : với tên là username : giá trị của nó là id của user
        signed : true
      })
      return res.redirect('/'); // nếu đúng thì cho vào trang chủ
    }else{
      return res.render('user/dangnhap',{thongbao : 'sai mật khẩu rùi :<' })//sai thì báo sai mk
    }
  }else{
    return res.render('user/dangnhap',{thongbao: 'tài khoản không tồn tại'})// ko tìm thấy tài khoàn trong db
  }
}

// module.exports.check = (req, res, next) =>{
//   if(4 < 5){ //sai 
//     next() // next() duoc goi thi ham dang sau duoc thuc hien
//   }
// }

module.exports.dangxuat = (req, res)=>{
  res.clearCookie('username'); // xoá cookie
  return res.redirect('/user/dangnhap')
}