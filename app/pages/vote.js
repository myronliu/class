var React = require('react');
var Layout = require('../components/layout');
var Toast = require('../helper/toast');
var CheckBox = require('../helper/checkbox');
var Loading = require('../helper/loading');
var NextButton = require('../components/nextbutton');
var ApiStore = require('../stores/apistore');
var ApiAction = require('../actions/apiaction');
var UrlConfig = require('../config/urlconfig');
var Cookie = require('../helper/cookie');

var AnswerItem = React.createClass({
  handleChange: function(ischeck){
    // console.log(ischeck);
    this.props.handleChange(this.props.data, ischeck);
  },
  handleTouch: function(){
    this.props.handleChange(this.props.data, !this.props.data.checked);
  },
  render: function(){
    return (
      <div>
        <div style={{padding:'10px'}} onTouchEnd={this.handleTouch} >
          <CheckBox ref="cb" onTouchEnd={this.handleChange} checked={this.props.data.checked} defaultChecked={this.props.data.checked}/>
          <span style={{display: 'inline-block', lineHeight: '20px', verticalAlign: 'top', marginLeft: '10px', width: '80%', wordWrap: 'break-word', wordBreak: 'break-all'}}>
            {this.props.data.answer}
          </span>
        </div>
      </div>
    )
  }
})

module.exports = React.createClass({
  getInitialState:function(){
    return {
      showLoading: false,
      disabled: false,
      answers: []
    }
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount:function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.getanswers, {questionid: this.props.questionid});
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  apiSuccess: function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getanswers:
        this.setState({
          answers: body
        })
        break;
      case UrlConfig.answersvote:
        Cookie.setCookie("votequest:" + this.props.questionid, "1", 7);
        window.to("/result?questionid=" + this.props.questionid);
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  handleChange: function(data, checked){
    if(this.props.votesingle==="Y"){
      for(var i=0; i<this.state.answers.length; i++){
        if(this.state.answers[i]._id == data._id){
          this.state.answers[i].checked = checked;
        }else{
          this.state.answers[i].checked = false;
        }
      }
      this.setState({
        answers: this.state.answers
      })
    }else{
      data.checked = checked;
      this.setState({
        answers: this.state.answers
      })
    }
  },

  renderItems: function(){
    return this.state.answers.map(function(item, index){
      return <AnswerItem key={item._id} data={item} id={item._id} type={this.props.votesingle==="Y" ? 'radio' : 'checkbox'} handleChange={this.handleChange}/>
    }.bind(this))
  },

  nextBtnPress:function() {
    if(Cookie.getCookie("votequest:"+this.props.questionid) === "1"){
      Toast.show("您已经投过票了");
      window.to("/result?questionid=" + this.props.questionid);
      return;
    }
    this.showLoading(true);
    if(!!Cookie.getCookie("name")){
      var arr = [];
      for(var i=0; i<this.state.answers.length; i++){
        if(this.state.answers[i].checked){
          var vote = {
            questionid: this.state.answers[i].questionid,// 问题编号
            answerid: this.state.answers[i]._id,//答案编号
            answer: this.state.answers[i].answer,//问题答案
            author: this.state.answers[i].author
          };
          arr.push(vote);
        }
      }
      if(arr.length > 0){
        var params={
          list: arr,
          voter: Cookie.getCookie("name")
        }
        ApiAction.post(UrlConfig.answersvote, params)
      }else{
        this.showLoading(false);
        Toast.show("请先选择");
      }
    }else{
      this.showLoading(false);
      Toast.show("请先输入姓名");
      window.to("/");
    }
  },

  render:function() {
    return (
      <Layout className={'login'} title={'投票'}>
        <Loading showLoading={this.state.showLoading}/>
        <div style={{padding:'10px'}}>
          <span style={{fontWeight: 'bold', color: 'red'}}>问：</span>
          <span>
            {this.props.title}
          </span>
        </div>
        {this.renderItems()}
        <div className='button'>
          <NextButton onTouchEnd={this.nextBtnPress} title={'提交'}/>
        </div>
      </Layout>
    )
  }
})