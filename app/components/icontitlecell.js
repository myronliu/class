import React from 'react';
export default class IconTitleCell extends React.Component {
  state = {
  };
  static propTypes = {
    icon:React.PropTypes.string,//图片地址
    title: React.PropTypes.string,//标题
    detail: React.PropTypes.string,//描述
    subDetail: React.PropTypes.string,//另一个颜色的描述
    onTouchEnd: React.PropTypes.func,//点击事件
    isShowIcon:React.PropTypes.bool,//是否显示icon
    isShowJianTou:React.PropTypes.bool//是否显示尖头
  }
  static defaultProps = {
    isShowJianTou:true,
    isShowIcon:true,
    icon: '',
    title: '',
    detail: '',
    subDetail: ''
  }
  onTouchEnd(e){
    if(this.props.onTouchEnd){
        this.props.onTouchEnd();
    }
  }
  render() {
    let iconStyle={
      background: 'url('+this.props.icon+') no-repeat',
      backgroundSize: 'contain'
    }
    let jianTouStyle={};
    if(!this.props.isShowIcon){
      iconStyle.display='none';
    }
    if(!this.props.isShowJianTou){
      jianTouStyle.display='none';
    }
    return (
      <div className="icontitlecell" onTouchEnd={this.onTouchEnd.bind(this)}>
        <p className="left"><i style={iconStyle}></i>{this.props.title}</p>
        <span className="right">
          <span>
            <span className="moneycolor">{this.props.detail}</span>{this.props.subDetail}&nbsp;
            </span>
            <i className="jianTou icon-angle-right icon-2x" style={jianTouStyle}></i>
          </span>
      </div>
    )
  }
}