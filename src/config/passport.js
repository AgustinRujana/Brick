import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
          User.findOne({ email: email }, function (err, user) {
            if (err) {
              return done(err); 
            }
            if (user) {
              return done(null, false, req.flash('signupMsg', 'That email is taken'));
            }
            
            let data = req.body

            let newUser = new User()
              newUser.email = { email: email, verified: false}
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
        User.findOne({ email: email }, function (err, user) {
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

//   passport.use('google-signup', new GoogleStrategy({
//     clientID: '719209026312-89tjekhmrrktoac38768bld62l96fqbt.apps.googleusercontent.com',
//     clientSecret: 'NLh_Zu2uICFWq6b_l4h7ksOv',
//     callbackURL: "http://localhost:8080/auth/google/callback",
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick( () => {
//       User.findOne({ email: profile._json.email }, function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (user) {
//           return done(null, user);
//         }
        
//         let newUser = new User()
//         newUser.email = profile._json.email
//         newUser.firstname = profile._json.given_name
//         newUser.lastname = profile._json.family_name
//         newUser.avatar = 'Default icon string'
//         newUser.phone = 0 //Phone ask later
//         newUser.password = newUser.generateHash(password)
//         newUser.country = 'Default' //Country ask later
//         newUser.plan = 0 //Default plan

//         newUser.save((err) => {
//           if(err) { throw err }
//           return done(null, newUser);
//         })
//       });
//     })
//   }
// ));


} 

export default passportConfig