import ReactDom from 'react-dom';
module.exports = React.createClass({
  propTypes:{
    title:React.PropTypes.string
  },
  getDefaultProps:function(){
    return {
      title:'登录密码'
    }
  },
  displayPassword: function(event){
    var pwd = ReactDom.findDOMNode(this.refs.pwd);
    
    if(this.state.open){
      this.setState({
        type: "password",
        src: '/images/h5/eyeclose.png',//"/icons/eyeclose.png",
        open: !this.state.open
      });
    }else{
      this.setState({
        type: "text",
        src: '/images/h5/eyeopen.png',//"/icons/eyeopen.png",
        open: !this.state.open
      });
    }
  },
  getInitialState: function(){
    return {
      password: "",
      type: "password",
      src: '/images/h5/eyeclose.png',//"/icons/eyeclose.png",
      open: false,
      result: false,
      errorcode: 1,
      message: '请输入密码'
    };
  },
  passwordLevel: function(password) {
    var Modes = 0;
    var CharMode = function(iN) {
      if (iN >= 48 && iN <= 57)//数字
        return 1;
      if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))//大小写
        return 2;
      else
        return 4; //特殊字符
    }
    var bitTotal = function(num) {
      var total = 0;
      for (let i = 0; i < 3; i++) {
        if (num & 1) total++;
        num >>>= 1;
      }
      return total;
    }
    for (let i = 0; i < password.length; i++) {
      Modes |= CharMode(password.charCodeAt(i));
    }
    return bitTotal(Modes);
  },
  handlerChange: function(event){
    var password = event.target.value;
    var start = -Number.MAX_VALUE;
    var end = Number.MAX_VALUE;
    if(!!this.props.length){
      start = parseInt(this.props.length.substring(0,this.props.length.indexOf("..")));
      end = parseInt(this.props.length.substring(this.props.length.lastIndexOf("..")+2));
    }
    if(!password){
      this.setState({
        result: false,
        errorcode: 1,
        password: password,
        message: '请输入密码'
      });
    }else if(password.length<start || password.length>end){
      this.setState({
        result: false,
        errorcode: 2,
        password: password,
        message: '密码长度不符合规范'
      });
    }else if(this.passwordLevel(password) < (!this.props.typecount ? 0 : this.props.typecount)) {
      this.setState({
        result: false,
        errorcode: 3,
        password: password,
        message: '密码不符合规范'
      });
    }else{
      this.setState({
        result: true,
        errorcode: 0,
        message: '',
        password: password
      });
    }
  },
  render: function(){
    return (
      <div className="passwordtext">

        <div className="passwordTextDiv">
          <span className='title'>{this.props.title}</span>
          <input className="passwordTextBox" onChange={this.handlerChange} ref="pwd" type={this.state.type} placeholder={this.props.content} maxLength="23" />
        </div>
        <div className={(!this.props.eyehide ? "show" : "hide") +" imgMiddle"} >
              <span>
                <img width={24} height={12} src={this.state.src} onTouchEnd={this.displayPassword} />
              </span>
        </div>
      </div>
    )
  }
});