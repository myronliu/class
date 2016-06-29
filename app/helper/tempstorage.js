/**
 * Created by liuyongpeng on 2016/01/18.
 */
var tempStorage={};

tempStorage.save = function(name, value){
    if(!!sessionStorage){
        sessionStorage[name] = value;
    }else{
        window[name] = value;
    }
    return true;
};

tempStorage.get = function(name){
    if(!!sessionStorage){
        return sessionStorage[name];
    }else{
        return window[name];
    }
};

module.exports = tempStorage;