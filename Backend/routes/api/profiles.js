let auth = require('../auth');
let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let Opinion = mongoose.model('Opinion');
let Chat = mongoose.model('Chat');
let Message = mongoose.model('Message');

router.param('username', function(req,res,next, username){
    User.findOne({username: username})
    .populate('opinions')
    .populate({
        path: 'opinions',
        populate: {
            path: 'author'
        },
        options: {
            sort: {
                createdAt: 'desc'
            }
        }
    })
    .then(function(user){
        if(!user){return res.sendStatus(404);}

        req.profile = user;

        return next();
    }).catch(next);
});

router.get('/:username/opinions', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        return res.json({
            opinions: req.profile.opinions
        })
    })
});

router.post('/:username/opinion', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
            if(!req.body.opinion.text){
                return res.status(422).json({errors: {opinion: 'is required'}})
            }
            if(req.body.opinion.text.length > 500){
                return res.status(422).json({errors: {opinion: 'is too long, maximum 500 characters.'}})
            }
            let opinion = new Opinion();
            opinion.text = req.body.opinion.text;
            opinion.author = user;
            opinion.save();
            req.profile.opinions = req.profile.opinions.concat([opinion]);
            req.profile.save().then(function(){
                return res.json({
                    opinion: opinion.toJSONFor(user)
                });
            })
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

router.post('/:username/client', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}

        user.addClient(req.profile._id)
        req.profile.addClient(user._id);
        req.profile.save();
        user.save().then(function(){
            Chat.findOne({users: {$all: [user, req.profile]}}).then(function(chat){
                if(!chat){
                    let newChat = new Chat();
                    //newChat.users.push(user, req.profile);
                    newChat.users = newChat.users.concat([user, req.profile]);
                    newChat.save();
                    let message = new Message();
                    message.author = user;
                    message.receiver = req.profile;
                    message.body = `Hi ${req.profile.firstName}! I found you on explore feed as a nearby client, I hope we can make contact.`
                    message.save();
                    //newChat.messages.push(message);
                    newChat.messages = newChat.messages.concat([message]);
                    newChat.save().then(function(){
                        return res.json({
                            profile: req.profile.toProfileJSONFor(user)
                        })
                    })
                } else {
                    return res.sendStatus(409);
                }
            })
        })
    }).catch(next);
});

router.delete('/:username/client', auth.required, function(req,res,next){
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