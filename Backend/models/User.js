let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let secret = require('../config').secret;
let uniqueValidator = require('mongoose-unique-validator');

let GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});


let UserSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "is required"], index: true},
    lastName: {type: String, required: [true, "is required"], index: true},
    username: {type: String, required: [true, "is required"], index: true, unique: true, lowercase: true},
    email: {type: String, required: [true, "is required"], index: true, unique: true, lowercase: true},
    clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    about: String,
    image: String,
    salt: String,
    hash: String,
    alertMessage: {type: Boolean, default: false},
    deliveryMode: {type: Boolean},
    activeDeliveryJob: {type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryJob'},
    isDelivering: {type: Boolean, default: false},
    isOrdering: {type: Boolean, default: false},
    earnedMoney: {type: Number, default: 0},
    deliveredItems: {type: Number, default: 0},
    transportation: {type: String, default: 'walking'},
    geometry: GeoSchema,
    available: {type: Boolean, default: true},
    ratings: [{type: Number}],
    isRequesting: {type: Boolean, default: false},
    opinions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Opinion'}]
}, { usePushEach: true });

UserSchema.plugin(uniqueValidator, {message: "is already taken."});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.checkPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    let today = new Date();
    let exp = new Date(today);
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
        alertMessage: this.alertMessage,
        deliveredItems: this.deliveredItems,
        image: this.image || "https://i.imgur.com/cDYfZwV.png",
        geometry: this.geometry.coordinates,
        deliveryMode: this.deliveryMode,
        token: this.generateJWT(),
        isDelivering: this.isDelivering,
        isOrdering: this.isOrdering,
        activeDeliveryJob: this.activeDeliveryJob,
        transportation: this.transportation,
        available: this.available,
        isRequesting: this.isRequesting,
        ratings: this.ratings.length > 0 ? ((this.ratings.reduce((a,b) => a+b))/this.ratings.length).toFixed(2) : 0
    };
};


UserSchema.methods.toProfileJSONFor = function(user){
    return {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        geometry: this.geometry.coordinates,
        about: this.about,
        alertMessage: this.alertMessage,
        earnedMoney: this.earnedMoney,
        deliveredItems: this.deliveredItems,
        activeDeliveryJob: this.activeDeliveryJob,
        image: this.image || "https://i.imgur.com/cDYfZwV.png",
        deliveryMode: this.deliveryMode,
        isDelivering: this.isDelivering,
        isOrdering: this.isOrdering,
        areClients: user ? user.isClient(this._id) : false,
        transportation: this.transportation,
        available: this.available,
        isRequesting: this.isRequesting,
        clients: this.clients,
        opinions: this.opinions,
        ratings: this.ratings.length > 0 ? ((this.ratings.reduce((a,b) => a+b))/this.ratings.length).toFixed(2) : 0
    };
};

UserSchema.methods.addClient = function(id){
    if(this.clients.indexOf(id) === -1){
        this.clients = this.clients.concat([id]);
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