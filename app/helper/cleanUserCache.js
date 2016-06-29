var cleanUserCache= function() {
    document.cookie = 'auth="";path=/'
    document.cookie = 'ssoToken="";path=/'
}
module.exports = cleanUserCache;