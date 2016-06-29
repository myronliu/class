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
  render: function(){
    var per = this.props.total == 0 ? {border: '2px solid', borderColor: '#ce0cff', width: '0%', marginTop: '-4px'} : {border: '2px solid', borderColor: '#ce0cff', width: (this.props.data.vote/this.props.total * 100)+'%', marginTop: '-4px'};
    return (
      <div style={{padding:'10px', display: 'block', borderBottom: '2px solid', borderBottomColor: '#cccbcb', paddingBottom: '24px'}}>
        <div>
          <span>回答人：<span>{this.props.data.author}</span></span>
          <span style={{marginLeft:'10px'}}>得票数：<span style={{color:'red'}}>{this.props.data.vote}</span></span>
        </div>
        <div>
          答案：{this.props.data.answer}
        </div>
        <div style={{border: '2px solid', marginTop: '10px'}}>
        </div>
        <div style={per}></div>
      </div>
    )
  }
})

module.exports = React.createClass({
  getInitialState:function(){
    return {
      showLoading: false,
      answers: [],
      total: 0
    }
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount:function(){
    if(Cookie.getCookie("votequest:"+this.props.questionid) === "1"){
      this.showLoading(true);
      ApiAction.post(UrlConfig.getanswervotes, {questionid: this.props.questionid});
    }else{
      Toast.show("您还未投票，请先投票");
      window.to("/list");
    }
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  apiSuccess: function(url,body){
    this.showLoading(false);
    var total = 0;
    switch(url){
      case UrlConfig.getanswervotes:
        for(var i=0; i<body.answers.length; i++){
          for(var j=0; j< body.votes.length; j++){
            if(body.answers[i]._id === body.votes[j]._id.answerid){
              body.answers[i].vote = body.votes[j].total;
              total += body.votes[j].total;
            }
          }
        }
        this.setState({
          answers: body.answers,
          total: total
        })
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  renderItems: function(){
    return this.state.answers.map(function(item, index){
      return <AnswerItem key={item._id} data={item} id={item._id} total={this.state.total}/>
    }.bind(this))
  },

  render:function() {
    return (
      <Layout className={'login'} title={'结果'}>
        <Loading showLoading={this.state.showLoading}/>
        {this.renderItems()}
      </Layout>
    )
  }
})