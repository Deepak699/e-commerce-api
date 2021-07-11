const express = require('express')
const auth = require('../auth/auth')
const Users = require('../models/Users')
const router = express.Router()
router.post('/',async (req,res)=>{
    try{
    const user = await new Users(req.body)
    const token = await user.genAuthToken()
    await user.save()
    res.send({user,token})
    }
    catch(e){
        return res.status(500).send(e)
    }

})
router.get('/me',auth, async (req,res)=>{
    res.send(req.user)
})
router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'email', 'password', 'age','address']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/login',async(req,res)=>{
    try{
    const user = await Users.findByCred(req.body.email,req.body.password)
    const token = await user.genAuthToken()
    res.send({user,token})
    }
    catch(e){
        res.status(401).send({"error":"Invalid Login"})
    }
   
})
module.exports = router