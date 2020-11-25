const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/Addorder' ,( req,res) => {
    console.log(req.body)
    const order = new Order({
        resturant : req.body.restId,
        food: req.body.food,
        user: req.body.userId
    })
    order.save(( err,order ) => {
        if(err) return res.status(401).json({success : false})
        res.status(201).json(order)
    })
})




module.exports = router