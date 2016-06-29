import globleImport from '../helper/globalImport.js'
var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var fs= require('fs')
var patha = require('path');

global.ajaxConfig = {url:"http://localhost:3009",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111'}}

var ErrorView = React.createFactory(require('../pages/error'));
var Home = React.createFactory(require('../pages/home'));
var Question = React.createFactory(require('../pages/question'));
var List = React.createFactory(require('../pages/list'));
var Vote = React.createFactory(require('../pages/vote'));
var Result = React.createFactory(require('../pages/result'));

router.get('/error',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(ErrorView({message:"出错啦！"}));
  res.render('index', {reactOutput: reactHtml,title:'出错啦'});
})

router.get('/',function(req,res){
  if(req.cookies.name){
    res.redirect('/question');
  }else{
    var reactHtml = ReactDOMServer.renderToString(Home());
    res.render('index', {reactOutput: reactHtml,title:'首页'});
  }
})

router.get('/question',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(Question());
  res.render('index', {reactOutput: reactHtml,title:'题目'});
})

router.get('/list',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(List());
  res.render('index', {reactOutput: reactHtml,title:'去投票'});
})

router.get('/vote',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(Vote({questionid: req.query.questionid, title: req.query.title, votesingle: req.query.votesingle}));
  res.render('index', {reactOutput: reactHtml,title:'投票'});
})

router.get('/result',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(Result({questionid: req.query.questionid}));
  res.render('index', {reactOutput: reactHtml,title:'结果'});
})

// router.get('*',function(req,res){
//   let path=req.path;
//   renderToPath(req,res,path);
// })
function renderToPath(req,res,path){
  let filePath=patha.join(__dirname,'..','/pages'+path+'.js');
  console.log('page==='+filePath);
  var folder_exists = fs.existsSync(filePath);
  if(folder_exists){
    var pageClass = require('../pages'+path);
    pageClass.serverData(req,res);
  }else{
    console.log('404'+path);
    res.redirect('/error')
    // res.render('index', {reactOutput: '',title:'海融易'});
  }
}
module.exports = router;