var React = require('react');
var ReactDOM = require('react-dom');
import globleImport from '../helper/globalImport.js'
var EvoFlux = require('evoflux');
var ErrorView = require('../pages/error');
var Home = require('../pages/home');
var Question = require('../pages/question');
var List = require('../pages/list');
var Vote = require('../pages/vote');
var Result = require('../pages/result');

// import Index from '../pages/financing/index';
// console.log('host');

global.ajaxConfig = {url:"/api/",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111','X-KJT-AUTH': '','X-API-VER': '2.0'}}

var container = document.getElementById('container');
var headerContainer = document.getElementById('header');


var Router = EvoFlux.createRouter({
  '/error': function(){
    ReactDOM.render(<ErrorView message={"出错啦！"}/>, container);
  },
  '/': function(){
    ReactDOM.render(<Home />, container);
  },
  '/question': function(){
    ReactDOM.render(<Question />, container);
  },
  '/list': function(){
    ReactDOM.render(<List />, container);
  },
  '/vote': function(){
    ReactDOM.render(<Vote questionid={this.query('questionid')} title={this.query('title')} votesingle={this.query('votesingle')}/>, container);
  },
  '/result': function(){
    ReactDOM.render(<Result questionid={this.query('questionid')} />, container);
  },

}).configure({html5history:true,convert_hash_in_init:false,after:function(){
  window.scrollTo(0,0);
}}).init();
window.to = function(url){

  let isExit=url.lastIndexOf('http',0)==0
  console.log(isExit);
  if(isExit){
    location.href=url;
  }else{
    return Router.setRoute(url);
  }
}
//handle href event.
//相对路径的url click 或者touch事件使用h5方式跳转。绝对路径的使用原生跳转(包含native url)。
//事件已经绑定了href，所以不管里面什么元素的点击都是往上冒泡到a元素运行这个链接。
var handLink = function(e) { 
  var el = e.target;
  var isLink = false;
  var hackLink = function(){
    var hrefValue = el.attributes.href.value
      if(hrefValue.search("://")===-1 && hrefValue.search("tel:")===-1){
        Router.setRoute(el.attributes.href.value);
        e.preventDefault();
      }
  };
  if (el.nodeName != "A") {
    (function pophref() {
      if (el.tagName != "A") {
        el = el.parentNode;
        if (el.tagName != "A") {
          // arguments.callee();
          pophref();
        } else {
          isLink = true;
        }
      }
    })();
    if (isLink) {
      hackLink();
    }
  }else{
    hackLink();
  }

}
var links = document.links;

for (var i = 0; i < links.length; i++) {
  if("ontouchstart" in document){
    links[i].addEventListener('touchstart', handLink,true);
  }else{
    links[i].addEventListener('click', handLink, true);
  }
};//下拉刷新的方式，需要重调用

module.exports = Router;