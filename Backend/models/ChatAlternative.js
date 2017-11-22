var mongoose = require('mongoose');

var ChatAlternativeSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref:'Message'}]
}, {timestamps: true});


ChatAlternativeSchema.methods.toJSON = function(){
    return {
        name: this.name,
        client: this.client.toProfileJSONFor(),
        deliveryGuy: this.deliveryGuy.toProfileJSONFor(),
        messages: this.messages.map(function(message){
            return message.toJSON();
        })
    };
};

mongoose.model('ChatAlternative', ChatAlternativeSchema);