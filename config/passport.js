const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config')
module.exports =function(passport){passport.use(new GoogleStrategy({
    clientID: config.get('googleClientID'),
    clientSecret: config.get('googleClientSecret'),
    callbackURL: "http://https://storybooks2019.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
 console.log(accessToken)
 console.log(profile)
  }
));
}
