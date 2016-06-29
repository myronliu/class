var React = require('react');
var Layout = require('../components/layout');
var Toast = require('../helper/toast');
var Loading = require('../helper/loading');
var NextButton = require('../components/nextbutton');
var Input = require('../components/Input');
var TitleInput = require('../components/titleinput');
var ApiStore = require('../stores/apistore');
var ApiAction = require('../actions/apiaction');
var UrlConfig = require('../config/urlconfig');
var Cookie = require('../helper/cookie');

var QuestionItem = React.createClass({
  getInitialState:function(){
    return{
      answer: "",
      disabled: false
    }
  },
  handleChange: function(event){
    this.props.data.answer = event.target.value;
    this.setState({
      answer: event.target.value
    })
  },
  componentDidMount: function(){
    // debugger
    if(!!Cookie.getCookie(this.props.id)){
      this.props.data.disabled = true;
      this.setState({
        answer: Cookie.getCookie(this.props.id),
        disabled: true
      })
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(!!Cookie.getCookie(nextProps.id)){
      this.props.data.disabled = true;
      this.setState({
        answer: Cookie.getCookie(nextProps.id),
        disabled: true
      })
    }
  },
  render: function(){
    return (
      <div>
        <div style={{padding:'10px'}}>
          <span style={{fontWeight: 'bold', color: 'red'}}>问：</span>
          <span>
            {this.props.data.title}
          </span>
        </div>
        <div style={{padding:'10px'}}>
          <textarea value={this.state.answer} disabled={this.state.disabled} onChange={this.handleChange} rows="5" style={{margin:'0', width:'100%', boxSizing:'border-box', resize: 'none', borderRadius: '4px', borderColor: '#d6d6d6', padding: '10px', lineHeight: '16px'}}></textarea>
        </div>
      </div>
    )
  }
})

module.exports = React.createClass({
  getInitialState:function(){
    return {
      showLoading: false,
      questions: [
        {
          _id: "-1",
          title: '你在学习中的舒服圈是什么？',
          votesingle: 'N',
          enable: 'Y',
          sort: '1'
        }
      ]
    }
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount:function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.getquestions)
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  apiSuccess: function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getquestions:
        this.setState({
          questions: body
        })
        break;
      case UrlConfig.createanswers:
        for(var i=0; i<this.state.questions.length; i++){
          if(!!this.state.questions[i].answer){
            this.state.questions[i].disabled = true;
            Cookie.setCookie(this.state.questions[i]._id, this.state.questions[i].answer, 7);
          }
        }
        this.setState({
          questions: this.state.questions
        })
        window.to('/list');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  nextBtnPress:function() {
    this.showLoading(true);
    if(!!Cookie.getCookie("name")){
      var arr = [];
      for(var i=0; i<this.state.questions.length; i++){
        if(!!this.state.questions[i].answer && !this.state.questions[i].disabled){
          var answer = {
            questionid: this.state.questions[i]._id,
            questiontitle: this.state.questions[i].title,
            answer: this.state.questions[i].answer
          };
          arr.push(answer);
        }
      }
      if(arr.length > 0){
        var params={
          list: arr,
          author: Cookie.getCookie("name")
        }
        ApiAction.post(UrlConfig.createanswers, params)
      }else{
        this.showLoading(false);
        Toast.show("已经答过题目或未输入答案");
      }
    }else{
      this.showLoading(false);
      Toast.show("请先输入姓名");
      window.to("/");
    }
  },

  gotoList: function(){
    window.to('/list');
  },

  renderItems: function(){
    return this.state.questions.map(function(item, index){
      return <QuestionItem key={index} data={item} id={item._id}/>
    }.bind(this))
  },

  render:function() {
    return (
      <Layout hideBack={true} className={'login'} title={'题目'} rightItems={[{title:'去投票',func: this.gotoList}]}>
        <Loading showLoading={this.state.showLoading}/>
        {this.renderItems()}
        <div className='button'>
          <NextButton onTouchEnd={this.nextBtnPress} title={'提交'}/>
        </div>
      </Layout>
    )
  }
})