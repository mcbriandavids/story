const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('config');

const passport = passport=>{
  passport.use(new GoogleStrategy({
    clientID: config.get('googleClientID'),
    clientSecret: config.get('googleClientSecret'),
    callbackURL: "/auth/google/callback",
    proxy: true
},
(accessToken, refreshToken, profile, done)=>{
  console.log(accessToken)
  console.log(profile)
}

))
}

module.exports = passport