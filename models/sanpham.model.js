var mongoose = require('mongoose');

var sanphamSchema = mongoose.Schema({
  img : String,
  name : String,
  price : Number,
  soluong : Number,
  danhmuc : String
})
var sanphamDb = mongoose.model('sanphamDb', sanphamSchema, 'sanpham');
module.exports = sanphamDb;