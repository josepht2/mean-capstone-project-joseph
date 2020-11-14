const mongoose = require('mongoose');
var purchaseSchema = new mongoose.Schema({
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
module.exports = mongoose.model('purchases', purchaseSchema);