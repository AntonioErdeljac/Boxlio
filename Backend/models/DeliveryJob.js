let mongoose = require('mongoose');

let DeliveryJobSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    deliveryGuy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    fromName: String,
    toName: String,
    fromLocation: [{type: Number}],
    toLocation: [{type: Number}],
    price: Number,
    item: Number,
    transportation: String,
    deliveryGuyLocationName: String
}, {timestamps: true});

mongoose.model('DeliveryJob', DeliveryJobSchema);