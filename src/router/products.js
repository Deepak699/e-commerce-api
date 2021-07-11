const express = require('express')
const Product = require('../models/products')
const router = express.Router()

router.post('/prod',async (req,res)=>{
    try{
    const prod = await new Product(req.body)
    await prod.save()
    res.send(prod)
    }
    catch(e){
        res.status(404).send(e)
    }
})
router.get('/getprod',async (req,res)=>{
    try{
    const prod = await Product.find()
    res.send(prod)
    }
    catch(e){
        res.status(400).send()
    }
})
router.patch('/updateprod/:id',async(req,res)=>{
    try{
    const prod = await Product.findByIdAndUpdate(req.params.id,req.body)
     await prod.save()
     if(!prod)
     {
         throw new Error()
     }
    res.status(200).send()
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports = router