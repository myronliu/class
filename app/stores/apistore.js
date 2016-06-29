var EvoFlux = require('evoflux');
module.exports = EvoFlux.createStore("api", {
    init: function(){
        this.items = this.items || {};
        this.url=this.url||'';
        this.data = this.data || {
            failData:{},
            successData:{}
        };
        this.triggerTo={
            success:"success",
            fail:"fail"
        }
    },
    addApiFun:function(successCb,failCb){
        this.addApiSuccess(successCb);
        this.addApiFail(failCb);
    },
    addApiSuccess:function(cb){
        this.on("success",function(){
            var result= this.data.successData[this.url]
            var body=result.body
            console.log(body)
            cb(this.url,body);
        }.bind(this));
    },
    addApiFail:function(cb){
        this.on("fail",function(){
            var result= this.data.failData[this.url]
            var status=result.status
            var message=result.message
            var body=result.body
            console.log(result)
            cb(this.url,status,message,body);
        }.bind(this));
    },
    removeApiFun:function(successCb,failCb){
        this.removeApiSuccess(successCb);
        this.removeApiFail(failCb);
    },
    removeApiSuccess:function(cb){
        this.removeListener('success', cb);
    },
    removeApiFail:function(cb){
        this.removeListener('fail', cb);
    },
    actions:{
        success:function(d){
            this.url   =d.data.url;
            this.data.successData[d.data.url] = d.data.result
            if(d.data.result.body&&d.data.result.body.auth){
                document.cookie = 'auth' + '='+ d.data.result.body.auth+';path=/'
            }
        },
        fail:function(d){
            this.url   =d.data.url;
            this.data.failData[d.data.url] = d.data.result
        },
        err: function(d){

        }
    },
    getSuccessDataWithUrl:function(url){
        return this.data.successData[url]?this.data.successData[url].body:undefined;
    },
    getFailDataWithUrl:function(url){
        return this.data.failData[url]?this.data.failData[url].body:undefined;
    },
    dehydrate:function(){
        return this.data;
    },
    rehydrate: function(url){
        if(global.H5hry){
            let pageData=global.H5hry[url];
            this.data.successData[url] = null;
            if(pageData){
                this.data.successData[url] = pageData;
                global.H5hry[url]=null;
            }
        }

    }
})