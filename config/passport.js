const config = require('config')
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy


const passport = passport=>{
  passport.use(new GoogleStrategy({
    clientID: config.get('googleClientID'),
    clientSecret: config.get('googleClientSecret'),
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done)=>{
  
const newUSer ={
    googleID:profile.id,
  firstName:profile.name.givenName,
  lastName: profile.name.familyName,
  image:profile.photos[0].value,
  email:profile.emails[0].value
 }
//  Check for existing user
 User.findOne({
   googleID : profile.id
 }).then(user=>{
   if(user){
    done(null, user)
   }else{
    // CReate User
    new User(newUSer)
    .save()
    .then(user=>{
      done(null, user)
    })
   }
 })
}
))
passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id).then(user=>{
    done(null, user)
  }) 
});
}

module.exports = passport