var logoinfo = React.createClass({
  render: function() {
    return (
      <div className='textcenter text-container'>
        <div><img src='/icons/ic_launcher.png' width="158" height="158" /></div>
        <div>海融易({this.props.version})</div>
      </div>
    );
  }
});

module.exports = logoinfo;