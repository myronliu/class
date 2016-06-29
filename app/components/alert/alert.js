var NextButton = require('../nextbutton');
module.exports = React.createClass({
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
      color:'#969696',
      textAlign:'center',
      borderBottom:'1px solid #BEBEBE',
      paddingTop:7,
      paddingBottom:7
    }
    var messageDiv={
      width:'100%',
      color:'#D1D1D1',
      textAlign:'center',
      wordWrap:'break-word',
      paddingTop:15,
      paddingBottom:15
    }
    return (
      <div className={this.props.show ? "show" : "hide"}>
        <div className="showStyle displayTable">
          <table style={table}>
          <tr>
          <td style={td}>
            <div style={center}>
              <div style={title}>{this.props.title}</div>
              <div style={messageDiv}>
                <div>
                  {this.props.message}
                </div>
              </div>
              <NextButton marginLeftAndRight={20} onTouchEnd={this.props.onTouchEnd}/>
            </div>
            <div className="height45"></div>
          </td>
          </tr>
          </table>
        </div>
      </div>
    )
  }
});