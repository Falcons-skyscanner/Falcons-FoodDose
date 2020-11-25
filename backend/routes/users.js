const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middlewares/middleware')


router.get('/auth', auth, (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        success: true
    })
})

// hash .. 
// store hashed pw and user in db
// generate token ! (sign token 3ala site jwt bl id for the user stored in db)
// res ( token  )

router.post('/signup', async (req, res) => {

    try {
        if (req.body.password === '') throw Error
        const hashedPw = await bcrypt.hash(req.body.Password, 10) // hasing the pw
        console.log(hashedPw)
        let user = new User({
            name: req.body.UserName,
            email: req.body.Email,
            password: hashedPw,
            role : 'User',
            request: false
        })
        await user.save()  // storing hashedpw to db
        const token = await jwt.sign({ _id: user._id }, 'secret') // generate token
        console.log(token)
        res.header('auth-rest', token).status(201).json({
            success: true,
            token,
            user
        }) // send token as a res and header

    } catch (err) {
        res.status(404).json({
            success: false,
            err
        })

    }
})

// user is exit ? 
// pw is the same ? ! 
// generate token 
// res   token 

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.Email }) // find user  in db
        const match = await bcrypt.compare(req.body.Password, user.password) // compare given password with hashed db password
        console.log(match)
        if (match) {
            const token = await jwt.sign({ _id: user._id }, 'secret') // generate token in password match
            res.header('auth-rest', token).status(201).json({ // sending token as a res and header
                success: true,
                token,
                user
            })
        }
    } catch (err) {
        res.status(404).json({ success: false, err })
    }
})

router.post('/request' , (req,res) => {
    console.log(req.body)
    User.findOneAndUpdate({ '_id': req.body.userId } ,{ 'request': true })
        .then( (user) => res.status(201).json({success:true}) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})

router.get('/getrequsers' , (req,res) => {
    
    User.find({ 'request': true })
        .then( (users) => res.status(201).json(users) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})

router.post('/removerequsers' , (req,res) => {
    
    User.findOneAndUpdate({ '_id': req.body.userId },{ 'request': false })
        .then( (users) => res.status(201).json(users) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})

router.post('/owner' , (req,res) => {
    console.log(req.body)
    User.findOneAndUpdate({ '_id': req.body.userId } ,{ 'role': 'Owner','request':false })
        .then( (user) => res.status(201).json({success:true}) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})

router.post('/rest' , (req,res) => {
    console.log(req.body)
    User.findOneAndUpdate({ '_id': req.body.ownerId } ,{ 'restaurant': req.body.restId }).populate('restaurant')
        .then( (user) => res.status(201).json({success:true,user}) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})

router.post('/ownerrest' , (req,res) => {
    console.log(req.body)
    User.findOne({ '_id': req.body.ownerId } ).populate('restaurant')
        .then( (user) => res.status(201).json({success:true,user}) )
        .catch( (err) => res.status(401).json({success:false,err}) )
})





module.exports = router