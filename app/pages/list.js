var React = require('react');
var Layout = require('../components/layout');
var Toast = require('../helper/toast');
var Loading = require('../helper/loading');
var NextButton = require('../components/nextbutton');
var ApiStore = require('../stores/apistore');
var ApiAction = require('../actions/apiaction');
var UrlConfig = require('../config/urlconfig');
var Cookie = require('../helper/cookie');

var QuestionItem = React.createClass({
  handleTouch: function(){
    window.to("/vote?questionid=" + this.props.data._id + "&title=" + this.props.data.title + "&votesingle=" + this.props.data.votesingle);
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
        <div style={{padding:'10px', textAlign:'right', paddingRight:'10px', paddingBottom:'10px'}}>
          <span onTouchEnd={this.handleTouch} style={{backgroundColor: '#6dd46d', padding: '10px', borderRadius: '4px', color: 'white'}}>去投票</span>
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
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  renderItems: function(){
    return this.state.questions.map(function(item, index){
      return <QuestionItem key={index} data={item} id={item._id} />
    }.bind(this))
  },

  render:function() {
    return (
      <Layout className={'login'} title={'去投票'}>
        <Loading showLoading={this.state.showLoading}/>
        {this.renderItems()}
      </Layout>
    )
  }
})