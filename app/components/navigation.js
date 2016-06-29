import React from 'react';
export default class Navigation extends React.Component{
  static propTypes = {
    title:React.PropTypes.string,
    rightItems:React.PropTypes.array,//[{title:登录,icon:'',func：login}，]
    hideBack:React.PropTypes.bool,
    backTo:React.PropTypes.func
  }
  static defaultProps ={
    title : '',
    rightItems:[],
    hideBack:false
  }
  back(){
    console.log('--------'+window.history.length)
    if(this.props.backTo){
      this.props.backTo();
    }else if(window.history.length<=2){
      window.to('/financing/index');
    }
    else{
      window.history.back();
    }
  }
  componentDidMount(){
    document.title = this.props.title;
  }
  render(){
    let  rightItems=this.renderItem();
    let backStyle={}
    if(this.props.hideBack){
      backStyle={display:'none'}
    }
    return (
      <div className='navigetion'>
        <div style={backStyle} className='back' onTouchEnd={this.back.bind(this)}>
          <i className="jianTou icon-angle-left icon-2x"></i>
        </div>
        <div className='title'>
          {this.props.title}
        </div>
        <div className='right'>
          {rightItems}
        </div>
      </div>
    );
  }

  renderItem(){
    var returnItem= this.props.rightItems.map(function(item,i){
      if(item.icon){
        return <img
            className='icon'
            src={item.icon}
            onTouchEnd={item.func}
            key={i}
            />
      }else{
        return <span
            onTouchEnd={item.func}
            key={i}
            className='item'>
             {item.title}
            </span>
      }

    });
    return returnItem;
  }
}