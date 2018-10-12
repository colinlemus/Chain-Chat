var bCrypt = require('bcrypt-nodejs');
var db = require('../models');

module.exports = function (passport) {
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },

        (req, username, password, done) => {
            var isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);
            }

            db.users.findAll({
                where: {
                    username: username
                }
            }).then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'Username does not exist.'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch((err) => {
                return done(null, false, {
                    message: 'Something went wrong with your sign in.'
                });
            });
        }
    ));
}