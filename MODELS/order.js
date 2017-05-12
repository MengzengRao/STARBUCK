var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({

   
    amount: String,
    drink: String,
    price: String,
    shop: String,
    total: String,
    yourname: String,
    date:String 

});

module.exports = mongoose.model('Order', OrderSchema);