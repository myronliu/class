var Platform={};

Platform.get = function(){

    if(!process.browser){
        return "weixin"
    }
    var req=navigator;
    var sUserAgent = req.userAgent.toLowerCase();
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsUa = sUserAgent.match(/MicroMessenger/i) == "micromessenger";
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";


    if(bIsUa){
        return "weixin"
    }else if (isLinux || isUnix || isLinux) {
        if(bIsAndroid) return "android";
        else return "linux";
    }else if (isWin) {
        return "windows"
    }else if(isMac){
        return "mac"
    }else if(bIsIpad){
        return "ipad"
    }else if(bIsIphoneOs){
        return "iphone"
    }else if (bIsAndroid){
        return "android"
    }
    else{
        return 'other'
    }

};

module.exports = Platform;