const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");


const userController = require('./controllers/users');
const loginController = require('./controllers/login');

const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const Twit = require("twit");

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


//Twitter passport 
//Set up Twitter API credentials
passport.use(new TwitterStrategy({
    consumerKey: '0O84qhS5xlla7k2dv23R4VJw6',
    consumerSecret: '0z0rOzc3nJVg89igZWHuSc3BIgtHz7UAqAqmCh5HqvHSYqKwMu',
    callbackURL: '/auth/twitter/callback'
}, (token, tokenSecret, profile, cb) => {
    //Post to twitter
    const T = new Twit({
        consumer_key: '0O84qhS5xlla7k2dv23R4VJw6',
        consumer_secret: '0z0rOzc3nJVg89igZWHuSc3BIgtHz7UAqAqmCh5HqvHSYqKwMu',
        access_token: token,
        access_token_secret: tokenSecret,    
    })

    //Post to twitter account
    T.post('statuses/update', { status: 'API testing'}, (err, data,res) => {
        console.log(data);
    })

    //Call callback function
    cb(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    done(null, id);
})


//Define routes
app.get("/", (req, res) => {
    res.status(200).json({message: "correct"});
})

//User controller routes
app.get("/users", userController.getUserByUsername);
app.get("/users/:id", userController.getUser);
app.post("/users", userController.createUser);

//Facebook api
app.post("auth/facebook", )
//Login controller
app.post('/login', loginController.login);

//Twitter auth
app.get("/auth/twitter", passport.authenticate('twitter'));

app.get("/auth/twitter/callback",
    passport.authenticate('twitter', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/');
    })
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
