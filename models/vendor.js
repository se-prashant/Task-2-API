const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const vendorSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports  =  mongoose.model('vendor', vendorSchema);
