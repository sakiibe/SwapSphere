const mongoose = require('mongoose')

const product = new mongoose.Schema({
   
    productID:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Product',product)