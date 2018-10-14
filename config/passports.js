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
                return bCrypt.compareSync(userpass, password);
            }

            db.users.findAll({
                where: {
                    username: username
                }
            })
            .then(user => {
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

    passport.use('local-signup', new LocalStrategy({
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        (req, username, password, done) => {
            var generateHash = (password) => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            db.users.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                console.log(user);
                if (user) {
                    return done(null, false, { message: 'That username is already taken.' });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        username,
                        password: userPassword,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };

                    db.users.create(data).then((newUser) => {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
}