var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./db/dbconnect');
var userModel = require('./db/models/user.model');
var itemModel = require('./db/models/item.model');
var purchaseModel = require('./db/models/purchase.model');
var cartModel = require('./db/models/cart.model');
var wishListModel = require('./db/models/wishlist.model');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/user', (req, res) => {
    var user = req.body;
    userModel.create(user).then(val => res.status(200).json(user))
});

app.post('/api/login', (req,res) => {
    var user = req.body;
    userModel.find(user).then(users => {
        if(users.length === 0){
            res.status(500).json({"error": "No user."});
        }
        else{
            res.status(200).json(users[0]);
        }
    });
});

app.get('/api/users', (req, res) => {
    userModel.find().then(users => res.status(200).json(users));
});

app.delete('/api/user/:uid', (req, res) => {
    userModel.deleteOne({_id: req.params.uid}).then(val => res.status(200).json(val));
});

app.put('/api/user', (req, res) => {
    let user = req.body;
    userModel.updateOne({_id: user._id}, 
        { $set: {
            username: user.username,
            password: user.password,
            role: user.role
            }
        })
        .then(val => res.status(200).json(val));
});

app.post('/api/item', (req, res) => {
    var item = req.body;
    itemModel.create(item).then(val => res.status(200).json(item));
});

app.get('/api/items', (req, res) => {
    itemModel.find().then(items => res.status(200).json(items));
});

app.delete('/api/item/:iid', (req, res) => {
    itemModel.deleteOne({_id: req.params.iid}).then(val => res.status(200).json(val));
});

app.put('/api/item', (req, res) => {
    let item = req.body;
    itemModel.updateOne({_id: item._id}, 
        { $set: {
            name: item.name,
            cost: item.cost
            }
        })
        .then(val => res.status(200).json(val));
});

app.post('/api/purchase', (req, res) => {
    var purchase = req.body;
    purchaseModel.create(purchase).then(val => res.status(200).json(purchase));
});

app.get('/api/purchases/:user', (req, res) => {
    let user = req.params.user;
    purchaseModel.find({user: user}).then(purchases => res.status(200).json(purchases));
});

app.post('/api/cart', (req, res) => {
    var cart = req.body;
    cartModel.create(cart).then(val => res.status(200).json(cart));
});

app.get('/api/carts/:user', (req, res) => {
    let user = req.params.user;
    cartModel.find({user: user}).then(carts => res.status(200).json(carts));
});

app.delete('/api/cart/:id', (req, res) => {
    let id = req.params.id;
    cartModel.deleteOne({_id: id}).then(val => res.status(200).json(val));
});

app.post('/api/wishlist', (req, res) => {
    var wishList = req.body;
    wishListModel.create(wishList).then(val => res.status(200).json(wishList));
});

app.get('/api/wishlists/:user', (req, res) => {
    let user = req.params.user;
    wishListModel.find({user: user}).then(wishLists => res.status(200).json(wishLists));
});

app.delete('/api/wishlist/:id', (req, res) => {
    let id = req.params.id;
    wishListModel.deleteOne({_id: id}).then(val => res.status(200).json(val));
});

app.listen(3000, () => {
    console.log('server is ready');
});