var express = require('express');
var bodyParser = require('body-parser');
var database = require('./models');
var path = require('path');
var passport = require('passport');
var session = require('express-session');

var app = express();
var PORT = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: 'keyboard cat', resave: true, saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(__dirname, 'public/build/static')));

require('./routes/api-routes.js')(app);
require('./routes/auth-routes.js')(app, passport);
require('./config/passports.js')(passport);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'build', 'index.html'));
});

database.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});