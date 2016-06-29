// /user/
var NativeClient = require('../helper/native');
var textFont = {
  fontSize: "14",
  color: "#BFBEBE"
}
var error = React.createClass({
  toNativeLoginPage: function(){
    NativeClient.LoginPage();
  },
  render: function() {
    return (     
      <div className={'absolute-Center'}>
        <div className={'textcenter'}><img src="images/err-icon.png" width="167" height="130" /></div>
        <div className={'textcenter line-title'} style={textFont}>{this.props.message}</div>
        <div className={'textcenter'}><button className={'button1'} onClick={this.toNativeLoginPage}>重试</button></div>
      </div>
    );
  }
});

module.exports = error;