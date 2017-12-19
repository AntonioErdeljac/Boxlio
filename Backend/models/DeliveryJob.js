let mongoose = require('mongoose');

let DeliveryJobSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    deliveryGuy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    fromName: String,
    toName: String,
    fromLocation: [{type: Number}],
    toLocation: [{type: Number}],
    price: Number,
    item: String,
    transportation: String,
    deliveryGuyLocationName: String
}, { usePushEach: true, timestamps: true});

mongoose.model('DeliveryJob', DeliveryJobSchema);