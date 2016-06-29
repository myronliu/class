import TapAble from 'react-tappable';
export default class ScrolHeader extends React.Component{
  state={
    scrolWidth:1000
  }
  static propTypes = {
    items:React.PropTypes.array,
    index:React.PropTypes.number,
    clickFun:React.PropTypes.func
  }
  static defaultProps ={
    items : [],
    index:0
  }
  componentDidMount(){
    let width=0;
    for (let i=0;i<this.props.items.length;i++){
      width=this.refs['span'+i].offsetWidth+width+1;
    }
    this.setState({scrolWidth:width})
  }
  clickItem(e) {
    let id=e.target.id
    if(this.props.clickFun){
      this.props.clickFun(Number(id));
    }
  }
  componentDidUpdate(prevProps,prevState){
    let width=0;
    for (let i=0;i<this.props.items.length;i++){
      width=this.refs['span'+i].offsetWidth+width+1;
    }
    if(width!==prevState.scrolWidth){
      this.setState({scrolWidth:width})
    }
  }
  renderItems(){
    return this.props.items.map(function(item,i){
      let hightStyle=''
      if(this.props.index==i){
        hightStyle='hight-light'
      }
      return <TapAble  key={i} onTap={this.clickItem.bind(this)}><span className={hightStyle} ref={'span'+i} id={i}>{item}</span></TapAble>
    }.bind(this));
  }
  render(){
    let divStyle={width:this.state.scrolWidth}
    return (
      <div className='nav_header'>
        <div ref='scrol' style={divStyle}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}