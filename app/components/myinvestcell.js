import React, {Component} from 'react';
import TapAble from 'react-tappable';
class MyInventCell extends React.Component {
  static propTypes = {
    data:React.PropTypes.object
  }
  static defaultProps ={
    data:{}
  }
  toDetail(){
    window.to('/financing/detail?bId='+this.props.data.bidId);
  }
  render(){
    let img=''
    let earnTitle=''
    if(this.props.data.bidStatus==='HKZ'){
      img='/images/h5/my_invest_huan.png';
      earnTitle='待收';
    }else if(this.props.data.bidStatus==='YJQ'){
      img='/images/h5/my_invest_qing.png'
      earnTitle='已赚';
    }else {
      img='/images/h5/my_invest_biao.png'
      earnTitle='待收';
    }
    let showTime={}
    if(!this.props.data.repaymentDate||this.props.data.repaymentDate.length===0){
      showTime={display:'none'}
    }
    return (
      <TapAble onTap={this.toDetail.bind(this)}>
        <div className='myinvestcell'>
          <div>
            <span>{this.props.data.bidName}</span>
            <img src={img}/>
            <span style={showTime}>到期：<span className='myinvestcell-price'>{this.props.data.repaymentDate}</span></span>
          </div>
          <div>
            <span>{'本金'+this.props.data.capital+'元'}</span>
          <span>
            <span>{earnTitle}</span>
            <span className='myinvestcell-price'>{this.props.data.earning}</span>
            <span>元</span>
          </span>
          </div>
        </div>
      </TapAble>
    );
  }
}
export default MyInventCell;