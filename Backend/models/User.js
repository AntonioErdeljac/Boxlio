var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;
var uniqueValidator = require('mongoose-unique-validator');

var GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});


var UserSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "is required"], index: true},
    lastName: {type: String, required: [true, "is required"], index: true},
    username: {type: String, required: [true, "is required"], index: true, unique: true, lowercase: true},
    email: {type: String, required: [true, "is required"], index: true, unique: true, lowercase: true},
    clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    available: Boolean,
    about: String,
    image: String,
    salt: String,
    hash: String,
    deliveryMode: {type: Boolean},
    activeDeliveryJob: [{type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryJob'}],
    isDelivering: {type: Boolean, default: false},
    isOrdering: {type: Boolean, default: false},
    earnedMoney: {type: Number, default: 0},
    deliveredItems: {type: Number, default: 0},
    transportation: {type: String, default: 'walking'},
    geometry: GeoSchema,
    available: {type: Boolean, default: true}
});

UserSchema.plugin(uniqueValidator, {message: "is already taken."});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.checkPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};


UserSchema.methods.toAuthJSON = function(){
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        about: this.about,
        earnedMoney: this.earnedMoney,
        deliveredItems: this.deliveredItems,
        image: this.image || "https://i.imgur.com/cDYfZwV.png",
        geometry: this.geometry.coordinates,
        deliveryMode: this.deliveryMode,
        token: this.generateJWT(),
        isDelivering: this.isDelivering,
        isOrdering: this.isOrdering,
        activeDeliveryJob: this.activeDeliveryJob,
        transportation: this.transportation,
        available: this.available
    };
};


UserSchema.methods.toProfileJSONFor = function(user){
    return {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        geometry: this.geometry.coordinates,
        about: this.about,
        earnedMoney: this.earnedMoney,
        deliveredItems: this.deliveredItems,
        activeDeliveryJob: this.activeDeliveryJob,
        image: this.image || "https://i.imgur.com/cDYfZwV.png",
        deliveryMode: this.deliveryMode,
        isDelivering: this.isDelivering,
        isOrdering: this.isOrdering,
        areClients: user ? user.isClient(this._id) : false,
        transportation: this.transportation,
        available: this.available
    };
};

UserSchema.methods.addClient = function(id){
    if(this.clients.indexOf(id) === -1){
        console.log(id, 'OKEJ SA SE DESAVA');
        this.clients.push(id);
    }
};

UserSchema.methods.removeClient = function(id){
    this.clients.remove(id);
    return this.save();
};

UserSchema.methods.isClient = function(id){
    return this.clients.some(function(clientId){
        return id.toString() === clientId.toString();
    })
};



mongoose.model('User', UserSchema);