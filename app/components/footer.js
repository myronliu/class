import React from 'react';
export default class Footer extends React.Component{
  toHome(){
    window.to('/');
  }
  toDownLoad(){
    window.to(WebUrl.download);
  }
  toHelp(){
    window.to('/help/faq?source=H5');
  }
  toAbout(){
    window.to('/helper/AboutUs');
  }
  componentDidMount(){
    //埋点代码
    (function(){
      var ma = window.document.createElement('script');
      ma.type = 'text/javascript';
      ma.async = true;
      ma.src ='https://data.kjtpay.com:8082/js/tj.js';
      var s = window.document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ma, s);
    })();
  }
  render(){
    return (
      <div className='footer' style={this.props.style}>
        <div>
          <a onTouchEnd={this.toHome}>首页</a>|
          <a  onTouchEnd={this.toDownLoad}>APP下载</a>|
          <a  onTouchEnd={this.toHelp}>帮助</a>|
          <a  onTouchEnd={this.toAbout}>关于我们</a>
        </div>
        <div className='copyright'>
          Copyright ©2016 青岛海融易网络科技有限公司 版权所有<br/>
          备案/许可证编号鲁ICP备14010519号-1
        </div>
        <script type="text/javascript"></script>
      </div>
    );
  }
}