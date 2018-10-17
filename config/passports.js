var bCrypt = require('bcrypt-nodejs');

module.exports = (passport, db) => {
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.users.findById(id)
            .then(users => {
                done(null, users);
            });
    });

    passport.use('local-signin', new LocalStrategy({
        passwordField: 'password',
        passReqToCallback: true,
    },

        (req, username, password, done) => {
            var verfiyPassword = (entredLoginPassword, userPassword) => {
                return bCrypt.compareSync(entredLoginPassword, userPassword);
            }

            db.users.findAll({
                where: {
                    username: username
                }
            })
                .then(user => {
                    if (user.length === 0) {
                        return done(null, false, {
                            message: 'Username or password is incorrect.'
                        });
                    }

                    if (!verfiyPassword(password, user[0].password)) {
                        return done(null, false, {
                            message: 'Username or password is incorrect.'
                        });
                    }

                    req.session.user = user;
                    return done(null, user);
                }).catch(err => {
                    return done(null, false, {
                        message: 'Error on sign in, please report to the administrators.'
                    });
                });
        }
    ));

    passport.use('local-signup', new LocalStrategy({
        passwordField: 'password',
        passReqToCallback: true
    },

        (req, username, password, done) => {
            var createHashedPassword = (enteredSignUpPassword) => {
                return bCrypt.hashSync(enteredSignUpPassword, bCrypt.genSaltSync(12), null);
            };

            db.users.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, { message: 'That username is already taken.' });
                } else {
                    var generatedHashPassword = createHashedPassword(password);

                    var data = {
                        username,
                        password: generatedHashPassword,
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