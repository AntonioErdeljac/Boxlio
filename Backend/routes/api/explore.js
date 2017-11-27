let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let auth = require('../auth');

router.get('/', auth.required, function(req,res,next){
	User.findById(req.payload.id).then(function(currentUser){
		if(!currentUser){
			return res.sendStatus(402);
		} 
		console.log(currentUser.geometry.coordinates, 'COORDINATES');

		User.geoNear(
	        {type: 'Point', coordinates: [currentUser.geometry.coordinates[0], currentUser.geometry.coordinates[1]]},
	        {maxDistance: 10000, spherical: true}
		).then(function(users){
            let filteredUsers = users.filter(user => user.obj.username !== currentUser.username && user.obj.deliveryMode === true && user.obj.available === true );
            console.log(filteredUsers, 'USERS');
            return res.json({
            	nearDeliveryUsers: filteredUsers
            })
		})
	})
})

module.exports = router;