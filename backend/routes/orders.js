const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/Addorder', (req, res) => {
    console.log(req.body)
    const order = new Order({
        resturant: req.body.restId,
        food: req.body.food,
        user: req.body.userId
    })
    order.save((err, order) => {
        if (err) return res.status(401).json({ success: false })
        res.status(201).json(order)
    })
})

router.post('/getOrders', (req, res) => {
console.log(req.body)
    Order.find({ 'user': req.body.userId }).populate('resturant')
        .then((data) => {
            console.log(data)
            res.status(201).json( data )})
        .catch((err)=>res.status(401).json({success:false, err}))
})




module.exports = router