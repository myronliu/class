var React = require('react');
var express = require('express');
var app = express();
var expstate = require('express-state');
expstate.extend(app);
app.set('state namespace', 'H5class');//设置client slide state的namespace。
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
require("node-jsx").install({ extension: ".js" });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.set('etag','strong');
app.use(express.static(__dirname + '/assets'));
var port    = process.env.PORT || 3888;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(function(err,req,res,next){
    if(err){
      console.log(err);
    }
    next();
  });
}
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.set('views', __dirname + '/app/distviews');//正式环境，由gulp build出一个替换js和css为min版的index.ejs
  // app.use(express.static(__dirname + '/public'));//正式时build js及其他到这里。
  app.use(function(err,req,res,next){
    if(err){
      res.redirect('/error');
    }else{
      next();
    }
  });
}

import router from './app/router/serverrouter';
import apirouter from './app/router/api';
app.use('/', router);
app.use('/api/',apirouter);

var server = app.listen(port,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("please visit:" + host + ":" + port);
});