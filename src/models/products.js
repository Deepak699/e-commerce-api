const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
productSchema.virtual('Order',{
    ref:'Order',
    localField:'_id',
    foreignField:'product'
})
const Products = mongoose.model('Products',productSchema)
module.exports = Products