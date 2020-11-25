var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var itemScheema = new Schema({
    type:
    {
        type: String
    },
    price:
    {
        type: String
    },
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})


let Item = mongoose.model('Item', itemScheema);

module.exports = Item