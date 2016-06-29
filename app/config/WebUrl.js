
module.exports={

    index:'/',
    /**
     *  腾讯应用宝下载
     */
    QQDownload:'http://a.app.qq.com/o/simple.jsp?pkgname=com.haier.hairy',
    /**
     *  下载页地址
     */
    download:'http://a.app.qq.com/o/simple.jsp?pkgname=com.haier.hairy',
    /**
     *  天天聚转入
     */
    TTJRollIn:'/user/TTjRollIn',
    /**
     *  收银台
     */
    kjtPay:function(token,voucherNo,price,successurl,processurl,failurl){
        return global.carshierAddress+'/v2/pay?token='+token+'&voucher='+voucherNo+'&price='+price+'&successurl='+successurl+'&processurl='+processurl+'&failurl='+failurl
    },
    /**
     *  支付成功页
     */
    paySuccess:function(title,message){
        return '/helper/Success?title='+title+'&message='+message
    },
    /**
     *  支付成功页
     */
    itemdetail:function(hotBidId){
        return '/financing/itemdetail/'+hotBidId+'?source=H5'
    },
    /***
     * 用户协议       用户协议：user  转账到银行卡协议：trans  快捷通服务协议：kjt 海融易平台服务协议：hry 快捷支付服务协议： kjzf
     * @param termtype
     * @returns {string}
     */
    terms:function(termtype){
        return '/help/terms/'+termtype+'?source=H5';


    }
}
