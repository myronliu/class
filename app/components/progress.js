import React from 'react';

export default class Progress extends React.Component{
  static propTypes = {
    percent:React.PropTypes.string//百分比  例：30%
  }
  static defaultProps ={
    percent : '0%'
  }

  render() {
    let withStyle={width:this.props.percent}
    return (
      <div className="progress">
        <span className="progress_chart">
          <span className="progress_totalnum" style={withStyle}></span>
        </span>
        <span className="progress_num">{this.props.percent}</span>
      </div>
    );
  }
}