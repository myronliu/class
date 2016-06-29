import React from 'react';
export default class LineCell extends React.Component {
  static propTypes = {
    showTopLine:React.PropTypes.bool,//是否显示上边的线
    showBottomLine: React.PropTypes.bool,//是否显示下边的线
    bottomLineLeft: React.PropTypes.string,//下边的线的缩紧
    paddingTopAndBottom:React.PropTypes.string//与上下的间距
  }
  static defaultProps = {
    showTopLine: true,
    showBottomLine: true,
    bottomLineLeft: '15px',
    paddingTopAndBottom:'0'
  }
  render() {
    let LineStyle={
      paddingTop:this.props.paddingTopAndBottom,
      paddingBottom:this.props.paddingTopAndBottom
    };
    if (this.props.showTopLine){
      LineStyle.borderTop='1px solid #F5F5F5';
    }
    let hrStyle={
      height: 1,
      border: 0,
      backgroundColor:'#F5F5F5',
      margin: '0px 0px 0px '+this.props.bottomLineLeft
    }
    return (
      <div>
        <div style={LineStyle}>
          {this.props.children}
        </div>
        <hr style={hrStyle}/>
      </div>
    )
  }
}