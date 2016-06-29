var React = require('react');
var center={
  width:'76%',
  marginLeft:'10%',
  padding:'2%',
  paddingBottom:15,
  backgroundColor:'white',
  WebkitBorderRadius: 5
}
var td={
  textAlign:'center',
  verticalAlign:'middle',
  color:'white'
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
var backStyle={opacity:1}


module.exports = React.createClass({
  render: function(){
    return (
      <div className={this.props.showLoading ? "show" : "hide"}>
        <div style={backStyle} className="twobtnalert">
           <table style={table}>
              <tbody>
                 <tr>
                   <td style={td}>
                     <i className="icon-spinner icon-spin icon-3x"></i>
                     </td>
                 </tr>
             </tbody>
           </table>
         </div>
      </div>
    )
  }
});