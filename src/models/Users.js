const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    phone:{
        type:Number,
        required:true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
userSchema.methods.genAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'newproj')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.statics.findByCred = async (email,password)=>{
    const user = await Users.findOne({email:email})
    if(!user){
        throw new Error({"error":'Invalid login'})
    }
    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid)
    {
        throw new Error({"error":'Invalid Login'})
    } 
    return user
}
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password'))
    {
    user.password = await bcrypt.hash(user.password,8)
    }
    console.log("middleware bjhvj")
    next()
})

const Users = mongoose.model('Users',userSchema)
module.exports = Users