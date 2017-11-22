var auth = require('../auth');
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.param('username', function(req,res,next, username){
    User.findOne({username: username}).then(function(user){
        if(!user){return res.sendStatus(404);}

        req.profile = user;

        return next();
    }).catch(next);
});


router.get('/:username', auth.optional, function(req,res,next){
    if(req.payload){
        User.findById(req.payload.id).then(function(user){
            if(!user){return res.json({profile: req.profile.toProfileJSONFor(null)})}

            return res.json({profile: req.profile.toProfileJSONFor(user)})
        }).catch(next);
    } else {
        return res.json({profile: req.profile.toProfileJSONFor(user)})
    }
});

router.post('/:username/friend', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        return user.addFriend(req.profile._id).then(function(){
            return res.json({
                profile: req.profile.toProfileJSONFor(user)
            })
        })
    }).catch(next);
});

router.delete('/:username/friend', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        return user.unFriend(req.profile._id).then(function(){
            return res.json({profile: req.profile.toProfileJSONFor(user)})
        })
    }).catch(next);
});

router.get('/', auth.optional, function(req,res,next){
        User.geoNear(
            {type: 'Point', coordinates: [45, 15]},
            {maxDistance: 500000000000, spherical: true}
        ).then(function(users){
            return res.json({
                profiles: users.map(function(user){
                    return {profile: user.obj.toProfileJSONFor(), distance: user.dis};
                })
            })
        }).catch(next);
});



module.exports = router;