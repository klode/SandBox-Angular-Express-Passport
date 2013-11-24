
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

var passport = require('passport')
  , authentication = require('./authentication');


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 9000);

// to render html 
app.set('views', path.join(__dirname + '/../client/views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// express - cookieParser and session needed for passport 
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(express.methodOverride());

// setup passport authentication - before routes, after express session
app.use(passport.initialize());
app.use(passport.session());
passport.use(authentication.localStrategy);
passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser);

// express.static first ...
app.use(express.static(path.join(__dirname, '/../client/static')));
// ... followed by other routes
app.use(app.router);


// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

require('./routes.js')(app, authentication);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
