var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');
var passport = require('passport');

router.post('/users', function(req,res,next){

    if(!req.body.user.username){
        return res.status(422).json({errors: {username: "can't be blank."}})
    }
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank."}})
    }
    if(!req.body.user.firstName){
        return res.status(422).json({errors: {"First Name": "can't be blank."}})
    }
    if(!req.body.user.lastName){
        return res.status(422).json({errors: {"Last Name": "can't be blank."}})
    }

    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank."}})
    }

    if(!req.body.user.location){
        return res.status(422).json({errors: {location: "is required."}})
    }

    if(!req.body.user.type){
        return res.status(422).json({errors: {how: 'do you want to use Boxlio?'}})
    }

    var user = new User();
    user.username = req.body.user.username;
    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.email = req.body.user.email;
    user.available = true;
    user.geometry = {coordinates: [req.body.user.location.lat, req.body.user.location.lng], type: 'point'};
    if(req.body.user.type === 'deliver'){
        user.deliveryMode = true;
    } else {
        user.deliveryMode = false;
    }
    user.setPassword(req.body.user.password);

    user.save().then(function(){
        return res.json({
            user: user.toAuthJSON()
        });
    }).catch(next);
});

router.post('/users/login', function(req,res,next){
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank."}});
    }
    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank."}});
    }

    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){return next(err);}

        if(user){
            user.populate('clients');
            user.populate('activeDeliveryJob')
            user.populate({
                path: 'activeDeliveryJob',
                populate: {
                    path: 'client'
                }
            })
            user.populate({
                path: 'activeDeliveryJob',
                populate: {
                    path: 'deliveryGuy'
                }
            })
            user.token = user.generateJWT();
            return res.json({
                user: user.toAuthJSON()
            });
        } else {
            return res.status(422).json(info);
        }
    })(req,res,next)
});


router.get('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id)
    .populate('clients')
    .populate('activeDeliveryJob')
    .populate({
        path: 'activeDeliveryJob',
        populate: {
            path: 'client'
        }
    })
    .populate({
        path: 'activeDeliveryJob',
        populate: {
            path: 'deliveryGuy'
        }
    })
    .then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({
            user: user.toAuthJSON()
        });
    }).catch(next);
});


router.put('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id)
    .populate('clients')
    .populate('activeDeliveryJob')
    .populate({
        path: 'activeDeliveryJob',
        populate: {
            path: 'client'
        }
    })
    .populate({
        path: 'activeDeliveryJob',
        populate: {
            path: 'deliveryGuy'
        }
    })
    .then(function(user){
        if(!user){return res.sendStatus(401);}

        if(typeof req.body.user.username !== 'undefined'){
            user.username = req.body.user.username;
        }
        if(typeof req.body.user.firstName !== 'undefined'){
            user.firstName = req.body.user.firstName;
        }
        if(typeof req.body.user.lastName !== 'undefined'){
            user.lastName = req.body.user.lastName;
        }
        if(typeof req.body.user.email !== 'undefined'){
            user.email = req.body.user.email;
        }

        if(typeof req.body.user.about !== 'undefined'){
            user.about = req.body.user.about;
        }

        if(typeof req.body.user.image !== 'undefined'){
            user.image = req.body.user.image;
        }
        if(typeof req.body.user.password !== 'undefined'){
            user.setPassword(req.body.user.password);
        }

        if(typeof req.body.user.deliveryMode !== 'undefined'){
            user.deliveryMode = req.body.user.deliveryMode
        }

        if(typeof req.body.user.transportation !== 'undefined'){
            user.transportation = req.body.user.transportation;
        }

        if(typeof req.body.user.isOrdering !== 'undefined'){
            user.isOrdering = req.body.user.isOrdering
        }

        if(typeof req.body.user.isDelivering !== 'undefined'){
            user.isDelivering = req.body.user.isDelivering
        }

        if(typeof req.body.user.activeDeliveryJob !== 'undefined'){
            user.activeDeliveryJob = req.body.user.activeDeliveryJob
        }

        if(typeof req.body.user.geometry !== 'undefined'){
            user.geometry = {coordinates: [req.body.user.geometry[0], req.body.user.geometry[1]], type: 'point'}
        }

        if(typeof req.body.user.available !== 'undefined'){
            user.available = req.body.user.available
        }

        return user.save().then(function(){
            return res.json({
                user: user.toAuthJSON()
            });
        });
    }).catch(next);
});


router.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;