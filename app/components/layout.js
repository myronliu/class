import React from 'react';
import Navigation from './navigation'
import Footer from './footer'
import DownLoadHeader from './DownLoadHeader.js'
export default class Layer extends React.Component {
  static propTypes = {
    isShowHeader:React.PropTypes.bool,
    title: React.PropTypes.string,
    rightItems: React.PropTypes.array//[{title:登录；func：login}，]
  }
  static defaultProps = {
    isShowHeader:true,
    title: '',
    rightItems: []
  }

  render() {
    let hiddenStyle={};
    if(!this.props.isShowHeader){
      hiddenStyle.display='none';
    }
    // <DownLoadHeader/>
    // <Footer  style={hiddenStyle}/>
    // <div className='first_footer' style={hiddenStyle}></div>
    return (
      <div className={'layout '+this.props.className}>
        <div style={hiddenStyle}>
          { 
            this.props.hideNav ? 
            <div></div>
            : <Navigation {...this.props}/> 
          }
        </div>
          {this.props.children}
      </div>
    )
  }
}