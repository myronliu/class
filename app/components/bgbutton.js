module.exports = React.createClass({
  propTypes:{
    marginLeftAndRight:React.PropTypes.number,
    title:React.PropTypes.string,
    onTouchEnd:React.PropTypes.func,
    disabled:React.PropTypes.bool
  },
  getDefaultProps:function(){
    return {
      marginLeftAndRight:0,
      title:'下一步',
      disabled:false
    }
  },
  onTouchEnd:function(){
    if(this.props.disabled){
      return;
    }
    this.props.onTouchEnd();
  },
  render:function(){
    var style={
      marginTop:10,
      paddingLeft:this.props.marginLeftAndRight,
      paddingRight:this.props.marginLeftAndRight
    }
    var imgUrl= '/images/h5/btn_aniu.png';
    var nextButtonStyle={
      width:'95%',
      height:'100%',
      WebkitAppearance:'none',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundColor: 'white',
      backgroundPosition: '50% 50%',
      border:0,
      WebkitBorderRadius: 5,
      fontSize:'16'
    }

    return (
      <div style={style}>
        <input type="button" style={nextButtonStyle} value={this.props.title} onTouchEnd={this.onTouchEnd}></input>
      </div>
    )
  }
})