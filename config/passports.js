var bCrypt = require('bcrypt-nodejs');

module.exports = (passport, db) => {
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
        passwordField: 'password',
        passReqToCallback: true,
    },

        (req, username, password, done) => {
            var isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);
            }

            db.users.findAll({
                where: {
                    username: username
                }
            }).then(user => {
                if (user.length === 0) {
                    return done(null, false, {
                        message: 'Username does not exist.'
                    });
                }

                // if (!isValidPassword(user.password, password)) {
                //     return done(null, false, {
                //         message: 'Incorrect password.'
                //     });
                // }

                return done(null, user);
            }).catch(err => {
                console.log(err);
                return done(null, false, {
                    message: 'Something went wrong with your sign in.'
                });
            });
        }
    ));
}