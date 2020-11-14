const mongoose = require('mongoose');
const uri = "mongodb+srv://joseph:joseph123@cluster0.21xci.mongodb.net/tcsdb?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    console.log('connected');
});