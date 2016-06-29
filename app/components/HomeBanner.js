import TapAble from 'react-tappable';
export default class Footer extends React.Component{
  static propTypes = {
    data: React.PropTypes.object
  }
  static defaultProps = {
    data:{}
  }
  nextPage(){
    console.log(this.props.data.target)
    console.log(this.props.data.type)
    if(this.props.data.type===1){
      if(this.props.data.target&&this.props.data.target.length>0){
        let  target=this.props.data.target;
        let targetAry=target.split("=");
        if(targetAry.length>1){
          window.to('/financing/detail?bId='+targetAry[1]);
        }
      }
    }else{
      if(this.props.data.target&&this.props.data.target.length>0){
        window.to(this.props.data.target);
      }
    }
  }
  render(){
    let imgStyle={
      width:'100%'
    }
    //
    return (
      <div className='swiper_div'>
        <TapAble onTap={this.nextPage.bind(this)}>
          <img src={this.props.data.image} style={imgStyle}/>
        </TapAble>
      </div>
    );
  }
}