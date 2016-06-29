var buyCondition= function(bindMobile,nameAuth,payPwd,checkData,fromUrl) {
    let checkParam={
        url:'',
        message:''
    };
    let bindMobileIsOk=false;
    let nameAuthIsOk=false;
    let payPwdIsOk=false;
    bindMobileIsOk=(!bindMobile || checkData.isPhoneBound);
    //是否需要支付密码
    nameAuthIsOk=!nameAuth||(checkData.isNameauthorized===1?true:false);
    //是否需要设置支付密码
    if (checkData.memberPaypasswdStatus == 0 || !payPwd) {
        payPwdIsOk=true;
    }else if(checkData.memberPaypasswdStatus == 2){
        payPwdIsOk=false;
        checkParam.url=WebUrl.download;
        checkParam.message='支付密码被锁定,请下载海融易app找回支付密码';
        return checkParam;
    }
    if(!bindMobileIsOk){
        checkParam.url='/checkcondition/BindMobile?phone='+checkData.phone;
        checkParam.message='绑定手机后，才可进行交易';
    }
    if(!nameAuthIsOk){
        if(checkParam.url.length===0){
            checkParam.url='/checkcondition/NameAuth?phone='+checkData.phone;
            checkParam.message='实名认证后，才可进行交易';
        }else{
            checkParam.url=checkParam.url+'&nameAuthIsOk=false';
            checkParam.message='完善个人信息后，才可进行交易';
        }
    }
    if(!payPwdIsOk){
        checkParam.url=WebUrl.download;
        checkParam.message='您还未设置支付密码，请下载海融易app设置支付密码';
    }
    return checkParam;




}
module.exports = buyCondition;