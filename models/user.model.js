var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  phonenumber : Number,
  cart: Array
  // cart : {
  //   type : Object,
  //   default : {}
  // }
})
module.exports = mongoose.model('userDb', userSchema, 'user');
