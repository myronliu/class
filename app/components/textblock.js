var tagStyle={
  display:'block'
}
var textblock = React.createClass({
  getDefaultProps: function(){
    return {
      titleClassName: "line-title",
      isHtml: false
    };
  },
  getInitialState: function(){
    return {
      isDisplay: this.props.displayDesc||false,
      titleClassName: "line-title",
      tagClassName:"line-title-tag",
    };
  },
  titleClick: function(){
    this.setState({isDisplay:!this.state.isDisplay});
    this.state.isDisplay?this.setState({descDisplay:{display:'none'}}):this.setState({descDisplay:{display:'block'}});
    this.state.isDisplay?this.setState({titleClassName:'line-title'}):this.setState({titleClassName:'line-title line-title-active'});
    this.state.isDisplay?this.setState({tagClassName:'line-title-tag'}):this.setState({tagClassName:'line-title-tag line-title-tag-active'});
  },
  componentWillMount: function() {
    this.state.isDisplay?this.setState({descDisplay:{display:'block'}}):this.setState({descDisplay:{display:'none'}});
    this.state.isDisplay?this.setState({titleClassName:'line-title line-title-active'}):this.setState({titleClassName:'line-title'});
    if(this.props.displayTag != undefined && !this.props.displayTag){
      tagStyle.display = "none"
    }
    if(this.props.isHtml){
      this.desc = <div dangerouslySetInnerHTML={{__html:this.props.desc}} />
    }else{
      this.desc = this.props.desc;
    }
  },
  componentDidMount: function() {
    
  },
  render: function() {
    var desc='';
    if(this.props.isHtml){
      desc = <div dangerouslySetInnerHTML={{__html:this.props.desc}} />
    }else{
      desc = this.props.desc;
    }
    return (
      <div className="rect-container">
        <TapAble onTouchEnd={this.props.handleTouch || this.titleClick }>
          <div className={this.state.titleClassName}>
            <span>{this.props.title}</span>
            <div className={this.state.tagClassName} style={tagStyle}></div>
          </div>
        </TapAble>
        <div style={this.state.descDisplay} className="text-container">{desc}</div>
        
      </div>
    );
  }
});

module.exports = textblock;//dangerouslySetInnerHTML={{__html: "sdf<br />sdf"}}  this.props.isHtml?'dangerouslySetInnerHTML={{__html: this.props.desc}}':