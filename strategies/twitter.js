//API KEY = 0O84qhS5xlla7k2dv23R4VJw6
//API KEY SECRET = 0z0rOzc3nJVg89igZWHuSc3BIgtHz7UAqAqmCh5HqvHSYqKwMu


//CLIENT ID = dThqaDc0YTRYZmRtaUktbUJRU246MTpjaQ
//CLIENT SECRET = VStNsr5pcE0X6kWDA5gLkF9fcNKvPqrYBnBgz7F7tWfJfGMw_A

const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const Twit = require("twit");


//Set up Twitter API credentials
passport.use(new TwitterStrategy({
    consumer_key: '0O84qhS5xlla7k2dv23R4VJw6',
    consumer_secret: '0z0rOzc3nJVg89igZWHuSc3BIgtHz7UAqAqmCh5HqvHSYqKwMu',
    callbackURL: 'http://127.0.0.1:5000/auth/twitter/callback'
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

