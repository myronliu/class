var headStyle={
  backgroundColor:"#014da1",
  padding:6
};
var backStyle = {
  float: "left",
  lineHeight: "2.4em",
  position: "absolute",
  color: 'white',
  width: 44,
  marginTop:1
};
var titleStyle={
  color:"#fff",
  textAlign:'center',
  lineHeight:"2em",
  overflow:'hidden',
  width: '100%',
  fontSize:16
};
var imgStyle = {
  height:"1.8em",
  width:"1.8em"
}

module.exports = React.createClass({
  back:function(){
    if(!!this.props.backTo){
      this.props.backTo();
    }else{
      window.history.back();
    }
  },
  render:function(){
    return (
      <div style={headStyle}>
        <div className={!this.props.hideBack ? "show" : "hide"} style={backStyle} onTouchEnd={this.back}>
          <i className="jianTou icon-angle-left icon-2x"></i>
        </div>
        <div style={titleStyle}>
          {this.props.title}
        </div>
      </div>
    )
  }
});