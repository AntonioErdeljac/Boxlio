let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let ChatSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref:'Message'}]
}, { usePushEach: true, timestamps: true});

ChatSchema.plugin(uniqueValidator, {message: 'is already taken'});

ChatSchema.methods.addUser = function(id){
    if(this.users.indexOf(id) === -1){
        this.users.push(id);
    }
    return this.save();
}

mongoose.model('Chat', ChatSchema);