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
    passwordField: 'password'
  },
      function(email, password, done) {
        process.nextTick( () => {
          User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (user) {
              return done(null, false, req.flash('signupMsg', 'That email already taken'));
            }
            let newUser = new User()
            newUser.email = email
            newUser.password = password
            newUser.save((err) => {
              if(err) { throw err }
              return done(null, user);
            })
          });
        })
      }
    ));
}

export default passportConfig