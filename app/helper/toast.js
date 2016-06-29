var Toast  = {};

Toast.show = function(msg, duration){
  duration=isNaN(duration)?2000:duration;
  var m = document.createElement('div');
  var s = document.createElement('div');
  m.style.cssText="width:100%;height:40px;top:80%;position:fixed;z-index: 999999;";
  s.innerHTML = msg;
  s.style.cssText="width: 80%; font-size: 1em; min-width: 1em; opacity: 0.5; height: 1; color: rgb(255, 255, 255); line-height: 1.5em; text-align: center; border-radius: 0.3em; z-index: 999999; font-weight: bold; margin: 0px auto; background-color: black;";
  m.appendChild(s);
  document.body.appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() { document.body.removeChild(m) }, d * 1000);
  }, duration);
};

module.exports = Toast;