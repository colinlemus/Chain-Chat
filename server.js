var express = require('express');
var bodyParser = require('body-parser');
var database = require('./models');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
var app = express();
var PORT = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meatboiimusic@gmail.com',
            pass: 'Roflstomp1'
        }
    });

    var mailOptions = {
        from: 'meatboiimusic@gmail.com',
        to: 'xjomama@gmail.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});

var sessionStore = new MySQLStore({
    port: 3306,
    user: "root",
    password: null,
    database: "project3_db",
    host: "127.0.0.1",
    clearExpired: true,
    checkExpirationInterval: 12000000,
    expiration: 600000,
    createDatabaseTable: true,
    connectionLimit: 1,
    endConnectionOnClose: true,
});

app.use(session({
    key: 'fc7qtAKgfWX9YIFtXv2z',
    secret: 'eae663310342a3ad3ec26747cac86c2f',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(__dirname, 'public/build/static')));

require('./routes/api-routes.js')(app);
require('./routes/auth-routes.js')(app, passport);
require('./config/passports.js')(passport, database);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

database.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});