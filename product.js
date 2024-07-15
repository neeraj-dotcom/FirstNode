const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    name:String,
    location:String,
    isActive:Boolean
});

module.exports = mongoose.model('test',productSchema);