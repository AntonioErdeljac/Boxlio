var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done){
    User.findOne({email: email})
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
        if(!user){
            return done(null, false, {errors: {email: "is invalid."}})
        } else if(!user.checkPassword(password)){
            return done(null, false, {errors: {password: "is invalid."}})
        }

        return done(null, user);
    }).catch(done);
}));