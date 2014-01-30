
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

// all environments
app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
app.use(flash());
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
 app.use(express.session({
   secret: settings.cookieSecret,
   store: new MongoStore({
      db: settings.db
        })
          }));
app.use(app.router);

   app.use(express.static(__dirname + '/public')
);});

 // app.use(express.cookieParser('keyboard cat'));
 // app.use(express.session({ cookie: { maxAge: 60000 }}));
 
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(function(req,res,next){
var err = req.flash('error'),
    success = req.flash('success');
res.locals.user = req.session.user;
res.locals.error = err.length ?err :null ;
res.locals.success = success.length ? success :null ;
next();
});
//routes(app) ; *
app.get('/', routes.index);
app.get('/u/:users', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);


//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

