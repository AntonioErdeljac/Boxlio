const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/', auth.required, function(req,res,next){
    User.findById(req.payload.id)
        .populate('clients')
        .then(function(user){
            
            return res.json({
                clients: user.clients
            
            })
        })
})

module.exports = router;