const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../model/user');
const passport = require('passport');

module.exports.signin = function(req , res)
{
    console.log(passport.checkAuthentication);
    //console.log(locals.user)
    return res.render('signin');
}

module.exports.signup = function(req , res)
{
    return res.render('register');
}

module.exports.register = function(req , res)
{
    var {name , email , password , confirmpassword} = req.body;
    // console.log(req.body);
    var err;
    if(!email || !name || !password || !confirmpassword)
    {
        req.flash('error', 'Please fill al1 the fields')
        return res.render('register');
    }

    if(password != confirmpassword)
    {
        
        req.flash('error', "Password don't match with Confirm Password")
        return res.render('register');
    }

    if(typeof err == 'undefined')
    {
        User.findOne({email : email}, function(err , data){
            if(err)
            {
                console.log(err);
            }

            if(data)
            {
                console.log("User Exists");
                req.flash('error', 'Invalid Username/Password')
                return res.render('register');
            }
            else{
                //encryption of password
                bcrypt.genSalt(10 ,(err , salt)=>{
                    if(err) throw err;
                    bcrypt.hash(password , salt ,(err , hash)=>{
                        if(err) throw err;
                        password = hash;
                        User({
                            email,
                            password,
                            name
                        }).save((err , data) => {
                            if(err) throw err;
                            req.flash('success' , "Register Sucessfully.. login to continue");
                            return res.render('signin');

                        });
                    })
                })
            }
        })
    }
    
}

module.exports.createSession = function(req , res)
{
   
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/main');
}

module.exports.destroySession = function(req ,res)
{
    req.logout();
    req.flash('success' , 'You have logged out')
    return res.redirect('back')
}