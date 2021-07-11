const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb+srv://deepak:deepak12345@cluster0.dh7sf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true, dbName: 'eshop'}).then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log(e)
})