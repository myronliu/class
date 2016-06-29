var React = require('react')

module.exports=React.createClass({
  propTypes:{
    type:React.PropTypes.string,
    placeholder:React.PropTypes.string,
    value:React.PropTypes.string,
    style:React.PropTypes.object,
    disabled:React.PropTypes.bool,
    className:React.PropTypes.string,
    onChange:React.PropTypes.func
  },
  getDefaultProps:function(){
    return {
      type:'text',
      placeholder:'',
      value:'',
      style:{},
      disabled:false,
      className:''
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(nextProps.value!=this.props.value){
      this.setState({
        value: nextProps.value
      });
      return false
    }
    return true
  },
  getInitialState:function(){
    return {
      value:this.props.value
    }
  },
  componentDidMount:function(){

  },

  textChange:function(event){
    if(this.props.onChange){
      this.props.onChange()
    }
    this.setState({
      value:event.target.value
    });
  },
  render: function () {
    return (
      <input className={this.props.className} ref='input' type={this.props.type} onChange={this.textChange}  value={this.state.value} style={this.props.style} placeholder={this.props.placeholder} disabled={this.props.disabled}/>
    )
  }
})

