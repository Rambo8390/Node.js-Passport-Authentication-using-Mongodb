const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true // for flash message
},
function(req ,email, password, done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err, user)  {
        if (err){
            req.flash('error', err);
            console.log("hi1")
            return done(err);
        }


        if(!user)
        {
            console.log('hi2');
            req.flash('error', 'User not found');
            return done(null , false);
        }

        bcrypt.compare(password , user.password , (err , match)=>{
            if(err)
            {
                req.flash('error', 'Invalid Username/Password');
                console.log("hi3")
                return done(null , false);
            }
            if(!match)
            {
                req.flash('error', 'Password Not match');
                console.log("hi4")
                return done(null , false);
            }
            if(match){
                console.log("hi5")
                return done(null , user);
            }
        })

    })
}))

passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated

passport.checkAuthentication = function(req , res ,next){

    // if user is signned in ,then pass on the resquest to the next funtion(controller action)
    if(req.isAuthenticated())
    {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signin');
}


passport.setAuthenticatedUser = function(req , res, next){
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookie and we are just seding this to the locals for the view.
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;