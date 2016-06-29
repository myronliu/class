var Api = require('../helper/ajax');

function post(req,res,url,param,success,fail,ajaxSet){
    if(!ajaxSet){
        ajaxSet=global.ajaxConfig
    }
    let auth=req.cookies.auth
    if(req.get('X-KJT-AUTH')){
        auth=req.get('X-KJT-AUTH')
    }
    let sso=req.cookies.ssoToken
    let ajaxSet2= {};
    ajaxSet2.url=ajaxSet.url;
    ajaxSet2.header=ajaxSet.header;
    ajaxSet2.header['X-KJT-AUTH']=(auth===undefined?'':auth);
    ajaxSet2.header['X-SSO-Auth']=(sso===undefined?'':sso);
    console.log('auth===='+auth);
    console.log(ajaxSet);
    Api.init(ajaxSet2).api.post(url)
        .send(param)
        .end(function(err,result){
            if(err||!result.body){
                if(fail){
                    fail(-1,'网络请求失败');
                }else{
                    res.redirect('/');
                }

            }else{
                let status=result.body.status
                console.log(result.body);
                if(!req.cookies.auth&&auth){
                    res.setHeader("Set-Cookie", ['auth='+auth]);
                }
                if(status===0&&success){
                    success(result.body);
                }else{
                    if(Number(status)===1004||Number(status)===1088){
                        res.setHeader("Set-Cookie", ['auth=""']);
                        res.redirect('/');
                    }
                    else if(fail){
                        fail(status,result.body.message,result.body);
                    }else{
                        res.redirect('/');
                    }
                }
            }
        }.bind(this))
}
export default post;