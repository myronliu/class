module.exports=React.createClass({
  handleTouch:function(){
    console.log('this.state.checked'+this.state.checked);
    if(this.props.disabled){
      return;
    }
    console.log('this.state.checked'+this.state.checked);
    var isCheck=!this.state.checked;
    this.setState({
      checked:isCheck
    })
    this.props.onTouchEnd(isCheck);
  },
  getInitialState:function(){
    return {
      checked:this.props.defaultChecked
    }
  },
  render:function(){
    var imgStyle={
      width: this.props.imgWidth
    };
    return (
      <div className="checkbox">
        <img style={imgStyle} src={this.state.checked ? '/images/h5/checkedPic.png' : '/images/h5/unCheckedPic.png'} onTouchEnd={this.handleTouch} ></img>
      </div>
    )
  }
})