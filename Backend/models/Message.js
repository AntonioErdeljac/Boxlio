let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    body: String
}, {timestamps: true});

MessageSchema.methods.toJSON = function(){
    return {
        author: this.author.toProfileJSONFor(),
        receiver: this.receiver.toProfileJSONFor(),
        body: this.body
    };
};

mongoose.model('Message', MessageSchema);