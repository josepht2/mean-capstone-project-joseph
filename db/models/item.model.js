const mongoose = require('mongoose');
var itemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    cost: {
        type: Number
    }
});
module.exports = mongoose.model('items', itemSchema);