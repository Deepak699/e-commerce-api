const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Products'
    }
})
const Order = mongoose.model('Order',orderSchema)
module.exports = Order