
const mongoose = require('mongoose')

const user = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    }

    ,
    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User',user)
