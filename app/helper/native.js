// native调用
var isServer = !process.browser;
var Native = {};

Native.LoginPage = function(args,cb){
  return executeCmd("User", "memberLogin", args, cb);
}

/**
* module为模块，native对应类名，例如:User
* method为要调用的方法，例如:memberLogin
* 允许不传入agrs和cb，第三个参数可以是cb。
* 
**/
function executeCmd(module,method,args,cb){
  var url = "zhuanle://haier/hybrid/" + module + "/" + method + "?";
  var argsArray = Array.prototype.slice.apply(arguments)
  for(var i in argsArray){
    if(argsArray[i] === undefined){
      argsArray.splice(i,1);
    }
  }//移除undefined的参数
  var nativeArgs = {};
  if(argsArray.length === 3){
    if(typeof argsArray[2] === "function"){
      nativeArgs.cb = argsArray[2];
    }else{
      if(argsArray[2]){
        nativeArgs.args = argsArray[2];
      }
    }
  }
  if(argsArray.length === 4){
    if(args){
      nativeArgs.args = args;
    }
    if(cb){
      nativeArgs.cb = cb;
    }
  }
  url += JSON.stringify(nativeArgs,function(key,value){
    return (typeof value  === 'function')?value.toString():value;
  });
  if(!isServer){
    OpenUrlInFrame(url);
  }//服务端不弹出，只返回url，由res去跳转。
  return url;
}//调用native方法

function OpenUrlInFrame(src) {
    //alert(src);
    var rootElm = document.documentElement;
    var newFrameElm = document.createElement("IFRAME");
    newFrameElm.setAttribute("src", src);
    rootElm.appendChild(newFrameElm);
    newFrameElm.parentNode.removeChild(newFrameElm);
};
module.exports = Native;