const express = require('express')
require('./db/db')
const userRouter = require('./router/Users')
const prodRouter = require('./router/products')
const orderRouter = require('./router/Order')
const app = express()
app.use(express.json())


app.use(userRouter)
app.use(prodRouter)
app.use(orderRouter)






app.listen('3000',()=>{
    console.log("running...")
})