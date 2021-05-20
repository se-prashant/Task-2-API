const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true

  },
  password: {
    type: String,
    required: true
  }
});



module.exports =  mongoose.model('User', userSchema)
