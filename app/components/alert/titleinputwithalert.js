var NextButton = require('../nextbutton');
module.exports = React.createClass({
  propTypes:{
    title:React.PropTypes.string,
    placeholder:React.PropTypes.string,
    firstBtnTitle:React.PropTypes.string,
    secondBtnTitle:React.PropTypes.string,
    type:React.PropTypes.string,
    firstBtnOnTouchEnd:React.PropTypes.func,
    secondBtnOnTouchEnd:React.PropTypes.func
  },
  getDefaultProps:function(){
    return {
      title:'',
      placeholder:'',
      firstBtnTitle:'取消',
      secondBtnTitle:'完成',
      type:'text'
    }
  },
  getInitialState:function(){
    return {
      text:''
    }
  },
  textChange:function(event){
    var text=event.target.value;
    this.setState({
      text:text
    });
  },
  firstBtnOnTouchEnd:function(){
    this.refs.input.blur();
    if(this.props.firstBtnOnTouchEnd){
      this.props.firstBtnOnTouchEnd();
    }
    this.setState({
      text:''
    });
  },
  secondBtnOnTouchEnd:function(){
    this.refs.input.blur();
    if(this.props.secondBtnOnTouchEnd){
      this.props.secondBtnOnTouchEnd();
    }
    this.setState({
      text:''
    });
  },
  render:function(){
    var center={
      //width:'70%',
      width:'76%',
      marginLeft:'10%',
      padding:'2%',
      paddingBottom:20,
      backgroundColor:'white',
      WebkitBorderRadius: 5
    }

    var td={
      textAlign:'center',
      verticalAlign:'middle'
    }
    var table={
      width:'100%',
      height:'100%',
      tableLayout:'fixed'
    }
    var title={
      width:'100%',
      color:'#2E2E2E',
      textAlign:'center',
      paddingTop:17,
      paddingBottom:3,
      fontWeight: 'bold'
    }
    var messageDiv={
      width:'100%',
      color:'#D1D1D1',
      textAlign:'center',
      wordWrap:'break-word',
      paddingTop:5,
      paddingBottom:15
    }
    var textStyle={
      WebkitAppearance:'none',
      border:'1px solid #BEBEBE',
      backgroundColor:'#FFFFFF',
      WebkitBorderRadius: 2,
      display:"inline-block",
      height:35,
      width:'96%',
      paddingLeft:5,
      fontSize:15
    }
    var cancleBtnStyle={
      marginRight:'10%',
      width:'44%',
      WebkitAppearance:'none',
      height:35,
      backgroundColor:'#E2E2E2',
      border:0,
      WebkitBorderRadius: 2,
      color:'#2E2E2E',
      fontSize:'15'
    }

    var nextButtonStyle={
      width:'44%',
      WebkitAppearance:'none',
      height:35,
      backgroundColor:this.props.disabled?'#969696':'#3FA9F5',
      border:0,
      WebkitBorderRadius: 2,
      color:'white',
      fontSize:'15'
    }
    var backStyle={opacity:1}
    var height65={height:65}
    if(!this.props.show){
      backStyle.display='none';
    }
    return (
      <div  style={backStyle} className="twobtnalert">
        <table style={table}>
          <tbody>
          <tr>
            <td style={td}>
              <div style={center}>
                <div style={title} dangerouslySetInnerHTML={{__html: this.props.title}} />
                <div style={messageDiv}>
                  <input type={this.props.type} ref="input" style={textStyle} onChange={this.textChange}  value = {this.state.text} placeholder={this.props.placeholder}></input>
                </div>
                <div>
                  <input type="button" style={cancleBtnStyle} value={this.props.firstBtnTitle} onTouchEnd={this.firstBtnOnTouchEnd}></input>
                  <input type="button" style={nextButtonStyle} value={this.props.secondBtnTitle} onTouchEnd={this.secondBtnOnTouchEnd}></input>
                </div>
              </div>
              <div style={height65}></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
});