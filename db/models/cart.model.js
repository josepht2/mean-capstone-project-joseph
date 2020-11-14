const mongoose = require('mongoose');
var cartSchema = new mongoose.Schema({
    user: {
        type: String
    },
    item: {
        type: String
    },
    name: {
        type: String
    },
    cost: {
        type: Number
    }
});
module.exports = mongoose.model('carts', cartSchema);