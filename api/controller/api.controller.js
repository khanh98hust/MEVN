var sanphamDb = require('../../models/sanpham.model')
var userDb = require('../../models/user.model')

const jwt = require('jsonwebtoken') // json web token
const { signedCookies } = require('cookie-parser')
const encodedToken = (data) =>{
  return jwt.sign({
    iss : 'ngockhanh',
    sub : data,
    iat : new Date().getTime()
  }, 'nodejsApi')
}

module.exports.laysanpham = async (req, res) => {
  var sanpham = await sanphamDb.find();
  return res.json(sanpham);
}

module.exports.guidangky = async (req, res) => {
  var us = await userDb.findOne({username : req.body.username});
  if(!us){
    var user = await userDb.create(req.body);
  }else{
    return res.status(404).json({status : 'usertontai'})
  }
}

module.exports.lay1sanpham = async (req, res) => {
  var sanpham = await sanphamDb.findById(req.params.id);
  return res.json(sanpham);
}

module.exports.xoa1sanpham = async (req,res)=>{
  let id = req.params.id;
  await sanphamDb.findByIdAndDelete(id);
  return res.status()
}

module.exports.login = async (req, res)=>{
  var user = await userDb.findOne({username : req.body.username});
  if(user){
    if(user.password == req.body.password){
      const token = encodedToken(user) // tao token cho tai khoan
      // return res.json({success: true, token});
      return res.json({token : token, user : user})
    }else{
      return res.status(400).json({thongbao :'sai mk'})
    }
  }else{
    return res.status(400).json({statusText :'tai khoan ko ton tai'})
  }
}

module.exports.updateCart = async (req, res)=>{
  var id = req.params.id;
  var a = await userDb.findOneAndUpdate({_id : id}, {$set:{cart : req.body}})
  res.json(a)
};

module.exports.getUser = async (req, res)=>{
  let a = await userDb.findOne({_id : req.params.id})
  res.json(a)
};

