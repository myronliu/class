module.exports=React.createClass({
  propTypes:{
    height:React.PropTypes.string,
    width:React.PropTypes.string,
    isShowTime:React.PropTypes.bool,
    onTouchEnd:React.PropTypes.func,
    complite:React.PropTypes.func
  },
  getDefaultProps:function(){
    return {
      height:'40',
      width:'100%',
      isShowTime:false
    }
  },
  getInitialState:function(){
    return {
      btntext:'获取验证码',
      text:'',
      disabled:false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.isShowTime===true&&this.state.disabled===false){
      this.setIntervalForResendCode(nextProps.isShowTime)
    }
  },

  componentWillUnmount:function(){
    if(this.interval){
      clearInterval(this.interval);
    }
  },
  textChange:function(event){
    var text=event.target.value;
    this.setState({
      text:text
    });
  },

  setIntervalForResendCode: function(isTimeStart){
    console.log('isTimeStart=='+isTimeStart);
    if(!isTimeStart){
      this.setState({
        btntext: "重新发送",
        disabled: false
      });
    }else{
      this.setState({
        time: 60,
        btntext: "60s",
        disabled: true
      });
      this.interval = setInterval(function(){
        if (this.state.time < 1) {
          clearInterval(this.interval);//这里先clear，不然会出问题
          this.setState({
            time: this.state.time - 1,
            btntext: "重新发送",
            disabled: false
          });
          this.props.complite();
        }else{
          this.setState({
            time: this.state.time - 1,
            btntext: ((this.state.time - 1) + "s")
          });
        }
      }.bind(this),1000);
    }
  },

  buttonPress:function(){
    if(this.state.disabled){
      return;
    }
    this.props.onTouchEnd();
  },
  render:function(){
    let titleStyle={width:this.props.titleWidth};
    return (
      <div className='smscodetext'>
        <span className='title' style={titleStyle}>验证码</span>
        <input className='input' type="tel" ref='textInput' onChange={this.textChange}  value = {this.state.text} placeholder="验证码" maxLength="6"></input>
        <input className='smsbutton' type="button"  value={this.state.btntext} onTouchEnd={this.buttonPress}></input>
      </div>
    )
  }
})