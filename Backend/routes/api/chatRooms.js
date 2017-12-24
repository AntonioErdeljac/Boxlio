let router = require('express').Router();
let mongoose = require('mongoose');
let Chat = mongoose.model('Chat');
let User = mongoose.model('User');
let auth = require('../auth');






router.param('name', function(req,res,next,name){
    let name1 = name.split('_')[0];
    let name2 = name.split('_')[2];
    Promise.all([   
        User.findOne({username: name1}),
        User.findOne({username: name2})
    ]).then(function(result){
        let user1 = result[0];
        let user2 = result[1];

        Chat.findOne({users: {$all: [user1, user2]}})
        .populate('users')
        .populate('messages')
        .populate({
            path: 'messages',
            populate: {
                path: 'author'
            }
        })
        .populate({
            path: 'messages',
            populate: {
                path: 'receiver'
            }
        })
        .then(function(chat){
            if(!chat){
                return res.sendStatus(404)
            }

            req.chat = chat;

            return next();
        }).catch(next);

    })
    
});

router.get('/', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        user.alertMessage = false;
        user.save();
        Chat.find({})
            .populate('client')
            .populate('deliveryGuy')
            .then(function(chats){
                return res.json({
                    chats: chats
                })
            })
    })
});

router.get('/:name', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(user.id.toString() === req.chat.users[0].id.toString() || req.payload.id.toString() === req.chat.users[1].id.toString()){            
            return res.json({
                chat: req.chat
            })
        }
        return res.sendStatus(403);
    }).catch(next);
});

router.get('/:name/messages', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(user.id.toString() === req.chat.users[0].id.toString() || req.payload.id.toString() === req.chat.users[1].id.toString()){
            return res.json({
                messages: req.chat.messages.map(function(message){
                    return message.toJSON();
                })
            })
        }
        return res.sendStatus(403);
    }).catch(next);
});

router.get('/:name/lastmessage', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(user.id.toString() === req.chat.users[0].id.toString() || req.payload.id.toString() === req.chat.users[1].id.toString()){
            return res.json({
                message: req.chat.messages[req.chat.messages.length-1]
            })
        }
        return res.sendStatus(403);
    }).catch(next);
});

module.exports = router;