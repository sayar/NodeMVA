
/**
 * Module dependencies.
 */

var express = require('express');
var	morgan = require('morgan');
var	bodyParser = require('body-parser');
var	methodOverride = require('method-override');
var	errorhandler = require('errorhandler');
var routes = require('./routes');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
//app.use(app.router); No longer needed, app.route() or express.Router class can be implemented
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
