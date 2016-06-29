import React, {Component} from 'react';
import Platform from '../helper/Platform.js'
class TitleInput extends React.Component {
  static propTypes = {
    title:React.PropTypes.string,
    placeholder:React.PropTypes.string,
    titleWidth:React.PropTypes.string,
    inputWidth:React.PropTypes.string,
    type:React.PropTypes.string,
    onChange:React.PropTypes.func,
    value:React.PropTypes.string,
    disabled:React.PropTypes.bool
  }
  static defaultProps ={
    title : '',
    placeholder:'',
    inputWidth:'75%',
    titleWidth:'42px',
    type:'text',
    value:'',
    disabled:false
  }
  state = {
    value: this.props.value
  }
  textChange(event){
    if(this.props.onChange){
      this.props.onChange()
    }
    this.setState({
      value:event.target.value
    });
  }
  inputBlur(event){
    if(this.props.onBlur && event.target.value.length > 5){
      this.props.onBlur(event.target.value);
    }
  }
  render(){
    let type=this.props.type;
    //let platform=Platform.get();
    if(type==='number'){
        type='number';
    }
    let inputStyle={width:this.props.inputWidth};
    let titleStyle={width:this.props.titleWidth};
    return (
      <div className='title_input'>
        <span className='title' style={titleStyle}>
          {this.props.title}
        </span>
        <input className='input'
           ref='input'
           type={type}
           onChange={this.textChange.bind(this)}
           value={this.state.value}
           style={inputStyle}
           placeholder={this.props.placeholder}
           disabled={this.props.disabled}
           onBlur={this.inputBlur.bind(this)}
        />
        {
          this.props.icon ? 
            <img src={this.props.icon} onTouchEnd={this.props.touchIcon}></img>
            : <div></div>
        }
      </div>
    );
  }
}
export default TitleInput;
