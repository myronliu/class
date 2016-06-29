var containerStyles = {
  border: "1px solid #ccc",
  borderRight: "0",
  borderTop: "0",
  height: "200",
  width: "33%",
  position: "relative",
  "float":"left",
  backgroundColor:"#fff"
};
var childContainerStyles = {
  margin: "auto",
  // width: "50%",
  height: "60%",
  // overflow: "auto",
  position: "absolute",
  textAlign:"center",
  top:"0",
  bottom:"0",
  left:"0",
  right:"0"
};

var tableStyle = {
  display: 'table',
  width: '100%',
  height: '100%'
}

var middleStyle = {
  display: 'table-cell',
  verticalAlign: 'middle'
}

var tagBgStyles = {
  width: '0',
  height: '0',
  border: 'solid transparent',
  borderBottomColor: 'red',
  position: 'absolute',
  top: '-38',
  right: '-38',
  WebkitTransform: 'rotate(45deg)',
  display: 'none'
};
var tagTextStyles = {
  position: 'absolute',
  top: '18',
  left: '-16',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '20',
};
var titleStyles = {
  fontSize: "13",
  color: "#333",
  paddingTop: "4"
}
module.exports = React.createClass({
  componentWillMount: function() {
    this.setState({
      url: this.props.canvisit? this.props.url: "",
    });
  },
  render:function(){
    // reset style start
    tagBgStyles.display = this.props.hot?'block':'none';
    titleStyles.color = this.props.isable?"#333":"#bebebe";
    // containerWidth = this.props.width?this.props.width:containerWidth;//!process.browser?200:(window.innerWidth-3)/3;

    containerStyles.width = this.props.width?this.props.width:containerStyles.width;//使用百分比
    containerStyles.height = this.props.width?this.props.width:100
    var defaultWidth = this.props.width?this.props.width:106;//不使用在正方形上，按ip5的宽度。
    tagBgStyles.borderWidth = defaultWidth/5;
    tagBgStyles.right = tagBgStyles.top = -tagBgStyles.borderWidth;
    tagTextStyles.top = defaultWidth/10;
    tagTextStyles.left = -(defaultWidth/10);
    tagTextStyles.fontSize = defaultWidth/10;
    //  reset style end
    return (
      <div style={containerStyles}>
        <a href={this.props.canvisit?this.props.url:"#"}>
          <div style={childContainerStyles}>
            <div style={tableStyle}>
              <div style={middleStyle}>
                <div><img src={this.props.icon} width={'26'} height={'26'}/></div>
                <div style={titleStyles}>{this.props.title}</div> 
              </div>
            </div>
          </div>
        </a>
        <div style={tagBgStyles}>
          <span style={tagTextStyles}>Hot</span>
        </div>
      </div>
      )
  }
});