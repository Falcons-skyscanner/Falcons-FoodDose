const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Resturant')

router.post('/createRes', (req, res) => {

  let restau = new Restaurant({
    resCategory: req.body.catId,
    Name: req.body.resName,
    Image: req.body.resImg,
    Phone: req.body.resPhone,
    Address: req.body.resAddress
  })
  restau.save((err, restau) => {
    if (err) return res.status(404).json({ error: err })
    res.json(restau)
  })
})


//find  restaurant  by name 
router.post('/restFind', (req, res) => {
  Restaurant.findOne({ Name: req.body.Name })
    .populate('resCategory')
    .exec((err, rest) => {
      if (err) return res.status(404).json({ success: false })
      res.json(rest)
    })
})

//find  restaurant  by id
router.post('/restFindById', (req, res) => {
  Restaurant.findOne({ _id: req.body._id })
    .populate('resCategory')
    .exec((err, rest) => {
      if (err) return res.status(404).json({ success: false })
      res.json(rest)
    })
})


//find  restaurants  by  category id
router.post('/getRestaurants', (req, res) => {
  console.log(req.body)
  Restaurant.find({ resCategory: req.body.categoryId })
    .populate('resCategory')
    .exec((err, rest) => {
      if (err) return res.status(404).json({ success: false })
      res.json(rest)
    })
})

router.post('/restCategoryById/:id', (req, res) => {
  Restaurant.findOne({ _id: req.body._id })
    .populate('resCategory')
    .exec((err, rest) => {
      if (err) return res.status(404).json({ success: false })
      res.json(rest)
    })
});

router.get('/getAllrest' , (req,res) => {
  Restaurant.find()
  .exec( (err, rests) => {
    if(err) return res.status(401).success({success:false,err})
    res.status(200).json({ count : rests.length })
  } )
})




module.exports = router