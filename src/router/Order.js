const express = require('express')
const auth = require('../auth/auth')
const Order = require('../models/orders')
const Product = require('../models/products')
const router = express.Router()
router.post('/cart/:id',auth,async(req,res)=>{
    try{
     const prod = await Product.findById(req.params.id)
     if(prod.stock > 0){
    const cart = await new Order({
        owner:req.user,
        product:req.params.id
    })
    
    //60ead7fffad02b196c6964db
    //60ead89ecbdca01a5439d676
    await cart.save()
    res.send(cart)
}
    }
    catch(e){
        res.status(404).send(e)
    }
})
router.delete('/cartdel/:id',auth,async(req,res)=>{
       const user = await Order.deleteOne({product:req.params.id,owner:req.user})
       console.log(user)
    // await user.save()
    res.status(200).send()
})
router.get('/cart',auth,async (req,res)=>{
 const prod = await Order.find().populate('product').populate('owner')
 res.send(prod)
})
module.exports = router