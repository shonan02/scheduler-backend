require('dotenv').config();

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: "",
    profileFields: ["displayName", "email"],
}, (accessToken, refreshToken, profile, done) => {
    //Save facebook data in the db
    //Call done() with user object
    const user = {
        facebook_username: profile.displayName,
        facebook_access_token: accessToken
    }
    
    //Callback function to indicate authentication is complete
    return done(null, user);
}))

