const mongoose = require('mongoose');
var wishListSchema = new mongoose.Schema({
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
module.exports = mongoose.model('wishLists', wishListSchema);