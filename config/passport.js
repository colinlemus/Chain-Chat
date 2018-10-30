const bCrypt = require('bcrypt-nodejs');
const sendEmail = require('./emailAuth');
const jwt = require('jsonwebtoken');
const EMAIL_SECRET = '1uK1ELJem9bczpBQ74xk';
const _ = require('underscore');

module.exports = (passport, db) => {
    const LocalStrategy = require('passport-local').Strategy;

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
            const verfiyPassword = (entredLoginPassword, userPassword) => {
                return bCrypt.compareSync(entredLoginPassword, userPassword);
            }

            db.users.findOne({
                where: {
                    username
                }
            })
                .then(user => {
                    console.log(user);
                    if (user.length === 0) {
                        return done(null, false, {
                            message: 'Username or password is incorrect.'
                        });
                    }

                    if (!user.active) {
                        return done(null, false, {
                            message: 'You must verify your account.'
                        });
                    }

                    if (!verfiyPassword(password, user.password)) {
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
            const createHashedPassword = (enteredSignUpPassword) => {
                return bCrypt.hashSync(enteredSignUpPassword, bCrypt.genSaltSync(12), null);
            };

            db.users.findOne({
                where: {
                    username
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, { message: 'That username is already taken.' });
                } else {
                    const generatedHashPassword = createHashedPassword(password);

                    const data = {
                        username,
                        password: generatedHashPassword,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        factorAuth: req.body.factorAuth,
                        active: false
                    };

                    db.users.create(data).then((newUser) => {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            try {
                                const emailToken = jwt.sign(
                                    {
                                        newUser: _.pick(newUser, 'id'),
                                    },
                                    EMAIL_SECRET, { expiresIn: '1d' }
                                )

                                const verificationURL = `http://localhost:8080/confirmation/${emailToken}`;

                                sendEmail(
                                    req.body.email,
                                    'Please verify your email to activate your account.',
                                    `Verify with this link: <a href='${verificationURL}'>${verificationURL}</a>`);
                            } catch (err) {
                                console.log(err);
                            }

                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-forgot', new LocalStrategy({
        passwordField: 'password',
        passReqToCallback: true
    },

        (req, username, password, done) => {
            db.users.findOne({
                where: {
                    username
                }
            })
                .then(user => {
                    if (user.length === 0) {
                        return done(null, false, {
                            message: 'That user does not exist.'
                        });
                    }

                    try {
                        const emailToken = jwt.sign(
                            {
                                user: _.pick(user, 'username'),
                            },
                            EMAIL_SECRET, { expiresIn: '3m' }
                        )

                        const changeURL = `http://localhost:8080/forgot/${emailToken}`;
                        console.log(user.dataValues.email);

                        sendEmail(
                            user.dataValues.email,
                            'Please use this link to change your account password.',
                            `Change with this link: <a href='${changeURL}'>${changeURL}</a>`);
                    } catch (err) {
                        console.log(err);
                    }

                    return done(null, user);
                }).catch(err => {
                    return done(null, false, {
                        message: 'Error on sign in, please report to the administrators.'
                    });
                });
        }
    ));
}