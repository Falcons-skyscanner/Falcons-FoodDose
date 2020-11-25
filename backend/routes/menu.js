const express = require('express')
const router = express.Router()
const Item = require('../models/Menu')

router.post('/additem', (req, res) => {
    console.log(req.body)
    const item = new Item({
        resturant: req.body.restId,
        type: req.body.type,
        price: req.body.price
    })
    item.save((err, item) => {
        if (err) return res.status(404).json({ success: false })
        res.status(201).json({ success: true, item })
    })
})

router.post('/getitems', (req, res) => {
    console.log(req.body)
    Item.find({ 'resturant': req.body.restId })
        .exec((err, items) => {
            if (err) return res.status(401).json({ success: false })
            res.status(201).json(items)
        })
})

router.post('/deleteItem', (req, res) => {
    console.log(req.body)
    Item.findByIdAndRemove({ '_id': req.body.id })
        .exec((err) => {
            if (err) return res.status(401).json({ success: false })
            res.status(201).json({ success: true })
        })
})

module.exports = router