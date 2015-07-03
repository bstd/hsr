var express = require('express');
var hbs = require('hbs');// explicit, because we need registerHelper
var helpers = require('./util/handlebars.helper');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var notez = require('./routes/notez');

var app = express();


// set env
//app.set('env', 'development');
app.set('env', 'production');


// view engine setup
app.set('views', path.join(__dirname, 'views'));


// handlebars setup
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


// middlewares
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));// todo remove?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// override for PUT
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));
// static last
app.use(express.static(path.join(__dirname, 'public')));


// use routes
app.use('/', routes);
app.use('/notes', notez);


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
			pageTitle: err.message,
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
