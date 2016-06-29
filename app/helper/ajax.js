var superagent = require('superagent');
var isService = !process.browser;
var deepCopy = require('../helper/deepcopy')
var isCors,apiAddress,headers;
//todo: auth header
var ajax = {};
ajax.init = function(config) {
  //example: api/ or http://**.**.**/api/
  if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }
  if(config=== undefined){
    config={};
  }
  if(config.url === undefined){
    config.url = '';
  }
  config.url.search('://') != -1 ? isCors = true : isCors = false;  
  apiAddress = config.url.endsWith('/')? config.url.substr(0,config.url.length): config.url;
  headers = config.header?config.header:{}
  // console.log(ajax);
  return this;
}.bind(ajax);
var requestTimeout = 10000;
ajax.api = {
  get: function(url){
    url=url.lastIndexOf('/',0)==0?url:('/'+url);
    this.superagent=superagent.get(apiAddress + url).timeout(requestTimeout).set(headers);
    return this
  },
  post: function(url){

    url=url.lastIndexOf('/',0)==0?url:('/'+url);
    if(isService || !isCors){
      if(!isService){
      }
      this.superagent=superagent.post(apiAddress + url).timeout(requestTimeout).set(headers)
      return this;
    }else{
      this.superagent=superagent.post(apiAddress + url).timeout(requestTimeout).set(headers).withCredentials()
      return this;
    }

  },
  del: function(url){
    url=url.startsWith('/')?url:('/'+url);
    this.superagent=superagent.del(apiAddress + url).timeout(requestTimeout).set(headers);
    return this
  },
  put: function(url){
    url=url.startsWith('/')?url:('/'+url);
    this.superagent=superagent.put(apiAddress + url).timeout(requestTimeout).set(headers);
    return this
  },
  end:function(cb){
    var url=this.superagent.url
    var param=this.superagent._data
    console.time(url);
    this.superagent.end(
        function(err,res){
          if(isService){
            console.log('**********************************************')
            console.log(new Date())
            console.timeEnd(url);
            if(param&&param.password!=undefined){
              param.password='';
            }
            console.log('params:'+JSON.stringify(param))
            if(err){
              console.log('服务器错误:'+err.message)
            }else{
              var status=res.body.status
              if(status!=0) {
                console.log('业务错误:' + JSON.stringify(res.body))
                console.log(res.body)
              }else{
                if(process.env.NODE_ENV==='development'||process.env.NODE_ENV==='uat'){
                  var body=deepCopy(res.body.body);
                  if(body.auth!=undefined){
                    body.auth='';
                  }
                  console.log('返回参数:' + JSON.stringify(body))
                }
              }
            }
            console.log('**********************************************')
          }
          cb(err,res)
        }
    )
    return this;
  },
  send:function(param){
    this.superagent.send(param)
    return this;
  }

};
module.exports = ajax;