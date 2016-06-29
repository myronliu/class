import React from 'react';
export default class DownLoadHeader extends React.Component{
  static propTypes = {
    show:React.PropTypes.bool
  }
  static defaultProps ={
    show : true
  }
  state={
    show:false
  }
  componentDidMount(){
    let isHideen=false;
    try {
      isHideen=sessionStorage.getItem('hiddenDownload');
    } catch (error) {
    }
    if(!isHideen&&this.props.show){
      this.setState({
        show:true
      })
    }
  }
  download(){
    window.to(WebUrl.download)
  }
  remove(){
    try {
      sessionStorage.setItem('hiddenDownload', true);
    } catch (error) {
    }
    this.setState({
      show:false
    })
  }
  render(){
    let display={}
    if(!this.state.show){
      display={display:'none'}
    }
    return (
      <div className='DownLoadHeader' style={display}>
        <div  onTouchEnd={this.remove.bind(this)} >
          <i className={'icon-remove icon-1x'}></i>
        </div>
        <img src='/images/h5/icon.png'/>
        <span>下载海融易客户端</span>
        <input className="download"  onTouchEnd={this.download}  type="button" value="立即下载"/>
      </div>
    );
  }
}