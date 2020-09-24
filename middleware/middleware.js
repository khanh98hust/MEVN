var userDb = require('../models/user.model')

module.exports.checklogin = async (req, res, next) =>{
  if(!req.signedCookies.username){ // kiem tra co cai cookie duoc gui len ko 
    return res.redirect('/user/dangnhap'); // khong co thi tra ve trang login
  }
  else{ //  co cookie gui len
    //console.log(req.signedCookies.username);
    var user = await userDb.findById(req.signedCookies.username) // tìm user với id ở trên
    if(!user){
      return res.redirect('/user/dangnhap'); // nếu không có tk nào tìm được thì về login
    }
    else{
      next();
    }
  }
}

module.exports.dangky = async (req, res, next) =>{
  var user = await userDb.findOne({username : req.body.username});
  if(user == null){
    next();
    return;
  }
  return res.render('user/dangky', {thongbao : 'Tài khoản đã tồn tại'})
}


