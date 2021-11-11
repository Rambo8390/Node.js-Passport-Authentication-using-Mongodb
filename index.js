const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser')

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const passport = require('passport');
const passportLocal  = require('./config/passportlocal')
const db = require('./config/mongoose');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(expressLayouts);

app.set('layout extractStyles' , true);
app.set('layout extractScripts', true);

app.set('view engine' ,'ejs');
app.set('views','./views');

app.use(cookieParser('secret'));
app.use(session({
    secret : 'secret',
    maxAge : 3600000,
    resave : false,
    saveUninitialized :false,
}));



app.use(bodyparser.urlencoded({extended : true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());   
app.use(customMware.setFlash);

app.use('/' ,require('./routes'));

app.listen(port , function(err){
    if(err)
    {
        console.log(`Error in running server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});