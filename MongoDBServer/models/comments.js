const mongoose = require('mongoose')








const commentsSchema = new mongoose.Schema({
    comment:[{type: mongoose.Schema.Types.ObjectId, ref: 'CommentText'}],
    product:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
   
})
module.exports = mongoose.model('Comments',commentsSchema)
