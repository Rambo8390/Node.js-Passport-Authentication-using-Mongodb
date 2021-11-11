const express = require('express');

const router = express.Router();
const passport = require('passport');


const usersController = require('../controller/user_controller');

router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);

router.post('/register',usersController.register);
// router.post('/login', usersController.login)

router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'},
     ) , usersController.createSession
);

router.get('/logout',usersController.destroySession);


// router.post('/create-session' ,function(req ,res , next) {
//     console.log(req.body);
//     passport.authenticate(
//     'local',function(err , user , info)
//     {
//         console.log(user);
//         if(err)
//         {
//             console.log(err);
//             return
//         }

//         if(!user)
//         {
//             console.log("Hi1")
//             console.log(user);
//             console.log(info);
//             return res.redirect('/users/signin');
//         }

//         req.logIn(user , function(err){
//             if(err)
//             {
//                 console.log(err);
//                 return;
//             }

//             return res.redirect('/');

//         });
//     })(req , res , next);
// });


module.exports = router;