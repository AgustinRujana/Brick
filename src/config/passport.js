import { Strategy as LocalStrategy } from 'passport-local'
import {user as User} from '../database/models.js'

const passportConfig = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
      function(req, email, password, done) {
        process.nextTick( () => {
          User.findOne({ 'email.email': email }, function (err, user) {
            if (err) {
              return done(err); 
            }
            if (user) {
              return done(null, false, req.flash('signupMsg', 'That email is taken'));
            }
            
            const randomString = () => { //Here we create a string for the user to verified its email later
              let randomStr = ''
              for( let i=0; i<15; i++){
                  const aux = Math.floor((Math.random() * 20) + 1)
                  randomStr += aux
              }
              return randomStr
            }

            let data = req.body

            let newUser = new User()
              newUser.email = {email: email, verified: false, verificationString: randomString()}
              newUser.firstname = data.firstname
              newUser.lastname = data.lastname
              newUser.avatar = '/img/avatars/user.svg' //Future upgrade, being able to upload avatar
              newUser.phone = data.phone
              newUser.password = newUser.generateHash(password)
              newUser.country = data.country
              newUser.plan = 0 //Default plan

            newUser.save((err) => {
              if(err) { throw err }
              return done(null, newUser);
            })
          });
        })
      }
  ))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done) {
      process.nextTick( () => {
        User.findOne({ 'email.email' : email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, req.flash('loginMsgEmail', 'Incorrect email'));
          }
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('loginMsgPsw', 'Incorrect Password'));
          }
          return done(null, user);
        });
      });
    }
  ))
} 

export default passportConfig