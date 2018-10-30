const express = require('express');
const bodyParser = require('body-parser');
const database = require('./models');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 63453;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

const sessionStore = new MySQLStore({
    port: 3306,
    user: 'root',
    password: '',
    database: 'project3_db',
    host: '127.0.0.1',
    clearExpired: true,
    checkExpirationInterval: 12000000,
    expiration: 600000,
    createDatabaseTable: true,
    connectionLimit: 1,
    endConnectionOnClose: true,
});

// const sessionStore = new MySQLStore({
//     port: 3306,
//     user: 'chaincha',
//     password: '0saC*X52fSy*A2',
//     database: 'chaincha_db',
//     host: '127.0.0.1',
//     clearExpired: true,
//     checkExpirationInterval: 12000000,
//     expiration: 600000,
//     createDatabaseTable: true,
//     connectionLimit: 1,
//     endConnectionOnClose: true,
// });

app.use(session({
    key: 'fc7qtAKgfWX9YIFtXv2z',
    secret: 'eae663310342a3ad3ec26747cac86c2f',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(__dirname, 'public/build/static')));

require('./routes/api-routes.js')(app);
require('./routes/auth-routes.js')(app, passport);
require('./config/passport.js')(passport, database);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

database.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});