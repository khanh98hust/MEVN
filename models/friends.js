const mongoose = require('mongoose');

const friend = new mongoose.Schema({
  name : String, 
  friends: [
    {ten : String, age : Number}
  ]
})

module.exports = mongoose.model('friend', friend, 'nguoiban')

