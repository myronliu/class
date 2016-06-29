import React from 'react';
export default class Index extends React.Component {
  state = {
    showLoading: false,
    pageData: {}
  }
  back(page) {
    if (window.history.length <= 2) {
      this.gotoHomePage();
    } else if (page) {
      window.history.go(page);
    } else {
      window.history.back();
    }
  }
  gotoHomePage() {
    window.to('/');
  }
  gotoLoginPage(fromUrl) {
    if (!fromUrl || (fromUrl instanceof Object)) {
      fromUrl = window.location.pathname + window.location.search
    }
    window.to('/user/login?fromUrl=' + fromUrl);
  }
  apiSuccess(url, body) {}
  apiFail(url, status, message, body) {
    this.showLoading(false)
    if (status == 1004 || status == 1088) { //1004为用户在其他地方登录， 1088为用户升级未完成
      cleanUserCache();
      this.gotoHomePage();
    } else if (status == 1021 && url === UrlConfig.balanceCheck) {

    } else {
      Toast.show(message, 1500);
    }
  }
  showLoading(show) {
    this.setState({
      showLoading: show
    })
  }
  componentWillMount() {}
  getClientData(url) {
    let urlData = {};
    console.log(url);
    if (!this.props.pageData) {
      if (!this.state.pageData[url]) {
        ApiStore.rehydrate(url);
        urlData = ApiStore.getSuccessDataWithUrl(url);
      }
    } else {
      if (this.props.pageData[url]) {
        urlData = this.props.pageData[url].body;
      }
    }
    return urlData;
  }
  setClientData(url) {
    let urlData = this.getClientData(url);
    let pageData = this.state.pageData;
    pageData[url] = urlData;
    this.setState({
      pageData: pageData
    });
    return urlData;
  }
  componentDidMount() {
    ApiStore.addApiFun(this.apiSuccess.bind(this), this.apiFail.bind(this));
  }
  componentWillUnmount() {
    ApiStore.removeApiFun(this.apiSuccess.bind(this), this.apiFail.bind(this));
  }
  render() {
    return ( < Layout className = {
        'index'
      }
      title = {
        '海融易'
      }
      rightItems = {
        [{
          title: '登录',
          func: this.login
        }]
      } >
      < /Layout>
    )
  }
  static serverData(req, res) {
    var classModel = React.createFactory(require('../pages' + req.path));
    var reactHtml = ReactDOMServer.renderToString(classModel());
    res.render('index', {
      reactOutput: reactHtml,
      title: '海融易'
    });
  }
}