let mongoose = require('mongoose');

let OpinionSchema = new mongoose.Schema({
	text: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	likes: {type: Number},
	likers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

OpinionSchema.methods.toJSONFor = function(user){
	return {
		text: this.text,
		author: this.author.toProfileJSONFor(user),
		likes: this.likes,
		likers: this.likers,
		createdAt: this.createdAt
	};
}

mongoose.model('Opinion', OpinionSchema);