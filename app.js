var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');
var i18n = require('i18n');
var passport = require('passport');
var OIDCStrategy = require('passport-openidconnect').Strategy;

// XXX This one is bad
var appUsers = {};

passport.use('oidc', new OIDCStrategy({
    authorizationURL: config.auth.oidc.authorizationURL,
    tokenURL: config.auth.oidc.tokenURL,
    userInfoURL: config.auth.oidc.userInfoURL,
    clientID: config.auth.oidc.clientID,
    clientSecret: config.auth.oidc.clientSecret,
    scope: config.auth.oidc.scope
},
function(accessToken, refreshToken, profile, done) {
    //console.log("ACCESS-TOKEN: ", accessToken);
    //console.log("REFRESH-TOKEN: ", refreshToken);
    //console.log("PROFILE: ", profile);

    var user = { id: profile._json.sub, username: profile._json.preferred_username, email: profile._json.email, name: profile._json.name };
    appUsers[user.id] = user;
    console.log("USERS: ", appUsers);

    done(null, user);
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    var user = appUsers[id];
    done(null, user);
});

i18n.configure({
    locales: config.i18n.locales,
    defaultLocale: config.i18n.defaultLocale,
    cookie: config.i18n.cookie,
    directory: __dirname + '/locales'
});

var passportHelpers = require('./routes/passport');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// Disable loggging for test environment
if (app.get('env') !== 'test') {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use(i18n.init);
app.use(session({
    secret: 'SUPERSECRET',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to add available locales to locals
app.use(function(req, res, next) {
  res.locals.locales = config.i18n.locales;
  next();
});

// Middleware to add authenticated user to locals
app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use('/', routes);
app.use('/users', users);

app.get('/auth/oidc', passportHelpers.ensureUnauthenticated, passport.authenticate('oidc', {
  callbackURL: '/auth/oidc/callback'
}));
app.get('/auth/oidc/callback', passportHelpers.ensureUnauthenticated, passport.authenticate('oidc', {
  callbackURL: '/auth/oidc/callback',
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
