var Cookie = {
  header: {},

  setTitle:function(title){
    document.title = title;
  },

  goBack: function(){
    window.history.go(-1);
  },

  // 只在客户端运行
  getCookie: function(c_name){
    if(!process.browser){
      return "";
    }

    //先查询cookie是否为空，为空就return ""
    if (document && document.cookie && document.cookie.length>0){
      // 通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
      var c_start = document.cookie.indexOf(c_name + "=");
      var c_end = 0;

      if (c_start != -1){
        //获取cookie值的开始位置
        c_start = c_start + c_name.length+1;
        c_end = document.cookie.indexOf(";",c_start);

        if (c_end == -1){
          c_end = document.cookie.length;
        }

        return unescape(document.cookie.substring(c_start,c_end));
      }
    }

    return ""
  },

  // 只在客户端运行
  setCookie: function(c_name, value, expiredays){
    if(!process.browser){
      return;
    }

    if(document){
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "; path=/" : ";expires="+exdate.toGMTString() +"; path=/");
    }
  }
};

module.exports = Cookie;