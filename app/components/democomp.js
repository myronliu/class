
var DemoAction = require('../actions/demoaction');
var DemoStore = require('../stores/demostore');

var demo = React.createClass({
	getInitialState:function(){
		return {data:"init"};
	},
	componentDidMount:function(){
		DemoStore.getData(function(d){
			console.log(d);
		})
		DemoStore.changeData(function(data) {
			this.setState({
				data: data
			  });
			}.bind(this));
	},
	handClick:function(e){
		e.preventDefault();
		console.log('this is handclick')
		DemoAction.demo();
	},
	render:function () {
		return (
			<div>
				<button onClick={this.handClick}>click</button>
        <a href="/#/demo">todemo router</a>
				<div>{this.props.user} isomorphic js </div>
				{this.state.data}
			</div>
		)
	}
});
module.exports = demo;