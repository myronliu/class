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
    }
  },
  handleChange: function(event){
    // this.props.data.answer = event.target.value;
    this.props.handleChange(event.target.value);
    // this.setState({
    //   answer: event.target.value
    // })
  },
  // componentDidMount: function(){
  //   // if(localStorage.getItem(this.props.id)){
  //     this.setState({
  //       answer: this.props.data.answer//JSON.parse(localStorage.getItem(this.props.id)).content,
  //     })
  //   //   this.props.data.a_id = JSON.parse(localStorage.getItem(this.props.id))._id;
  //   //   this.props.data.answer = JSON.parse(localStorage.getItem(this.props.id)).content;
  //   // }
  // },
  // componentWillReceiveProps: function(nextProps) {
  //   // if(localStorage.getItem(nextProps.id)){
  //     this.setState({
  //       answer: this.props.data.answer //JSON.parse(localStorage.getItem(nextProps.id)).content,
  //     })
  //   //   this.props.data.a_id = JSON.parse(localStorage.getItem(nextProps.id))._id;
  //   //   this.props.data.answer = JSON.parse(localStorage.getItem(nextProps.id)).content;
  //   // }
  // },
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
          <textarea value={this.props.data.answer} onChange={this.handleChange} rows="5" style={{margin:'0', width:'100%', boxSizing:'border-box', resize: 'none', borderRadius: '4px', borderColor: '#d6d6d6', padding: '10px', lineHeight: '16px'}}></textarea>
        </div>
      </div>
    )
  }
})

var q = {
  _id: "-1",
  title: '你在学习中的舒服圈是什么？',
  votesingle: 'N',
  enable: 'Y',
  sort: '1'
};
module.exports = React.createClass({
  getInitialState:function(){
    return {
      showLoading: false,
      questions: [
        q
      ],
      cur: 0,
      btnText: '提交',
      item: q,
      _id: q._id
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
        for(var i = 0; i < body.length; i++){
          body[i].a_id = localStorage.getItem(body[i]._id) ? JSON.parse(localStorage.getItem(body[i]._id))._id : "";
          body[i].answer = localStorage.getItem(body[i]._id) ? JSON.parse(localStorage.getItem(body[i]._id)).content : "";
        }
        this.setState({
          questions: body,
          cur: 0,
          btnText: body.length > 1 ? '下一题' : '提交',
          item: body.length > 0 ? body[0] : q,
          _id: body.length > 0 ? body[0]._id : q._id
        })
        break;
      case UrlConfig.updateanswer:
        localStorage.setItem(this.state.item._id, JSON.stringify({_id: this.state.item.a_id, content: this.state.item.answer}));
        if(this.state.cur + 1 < this.state.questions.length - 1){
          this.setState({
            item: this.state.questions[this.state.cur + 1],
            cur: this.state.cur + 1,
            _id: this.state.questions[this.state.cur + 1]._id,
            btnText: '下一题'
          })
        }else if(this.state.cur + 1 == this.state.questions.length -1){
          this.setState({
            item: this.state.questions[this.state.cur + 1],
            cur: this.state.cur + 1,
            _id: this.state.questions[this.state.cur + 1]._id,
            btnText: '提交'
          })
        }else{
          window.to('/list');
        }
        break;
      case UrlConfig.createanswers:
        localStorage.setItem(body[0].questionid, JSON.stringify({_id: body[0]._id, content: body[0].answer}));
        if(this.state.cur + 1 < this.state.questions.length - 1){
          this.setState({
            item: this.state.questions[this.state.cur + 1],
            cur: this.state.cur + 1,
            _id: this.state.questions[this.state.cur + 1]._id,
            btnText: '下一题'
          })
        }else if(this.state.cur + 1 == this.state.questions.length -1){
          this.setState({
            item: this.state.questions[this.state.cur + 1],
            cur: this.state.cur + 1,
            _id: this.state.questions[this.state.cur + 1]._id,
            btnText: '提交'
          })
        }else{
          window.to('/list');
        }
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
      if(!!this.state.item.answer){
        if(!!this.state.item.a_id){
          var answer = {
            id: this.state.item.a_id,
            questionid: this.state.item._id,
            questiontitle: this.state.item.title,
            answer: this.state.item.answer,
            author: Cookie.getCookie("name")
          };
          ApiAction.post(UrlConfig.updateanswer, answer)
        }else{
          var answer = {
            questionid: this.state.item._id,
            questiontitle: this.state.item.title,
            answer: this.state.item.answer
          };
          var params={
            list: [answer],
            author: Cookie.getCookie("name")
          }
          ApiAction.post(UrlConfig.createanswers, params)
        }
      }else{
        this.showLoading(false);
        Toast.show("请输入答案");
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

  handleChange: function(val){
    this.state.item.answer = val;
    this.setState({
      item: this.state.item
    })
  },

  render:function() {
    return (
      <Layout hideBack={true} className={'login'} title={'题目'} rightItems={[{title:'去投票',func: this.gotoList}]}>
        <Loading showLoading={this.state.showLoading}/>
        <QuestionItem data={this.state.item} id={this.state.item._id} handleChange={this.handleChange}/>
        <div className='button'>
          <NextButton onTouchEnd={this.nextBtnPress} title={this.state.btnText}/>
        </div>
      </Layout>
    )
  }
})