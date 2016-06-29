import Layout from '../components/layout'

import Cookie from '../helper/cookie';
import Toast from '../helper/toast';
import Loading from '../helper/loading';
import NextButton from '../components/nextbutton';
import Input from '../components/Input';
import TitleInput from '../components/titleinput';
import ApiStore from '../stores/apistore';
import ApiAction from '../actions/apiaction';
import UrlConfig from '../config/urlconfig'
import BasePage from '../components/BasePage.js';
import TwoBtnAlert from '../components/twobtnalert'
export default class extends BasePage {
  state={
    disabled: false
  };
  downkeyboard() {
    this.refs.name.refs.input.blur();
  }

  nextBtnPress() {
    this.downkeyboard()
    var Name = this.refs.name.state.value;
    if (Name.length === 0) {
      Toast.show('请输入姓名', 1500);
    } else {
      Cookie.setCookie("name", Name, 7);
      window.to('/question')
    }
  }

  componentDidMount(){
    if(!!Cookie.getCookie("name")){
      this.refs.name.state.value = Cookie.getCookie("name");
      this.setState({
        disabled: true
      })
    }
  }

  render() {
    return (
      <Layout hideBack={true} className={'login'} title={'首页'}>
        <div className='center_input'>
          <TitleInput title={'姓名'} ref='name' inputWidth={'75%'} placeholder={'请输入姓名'} disabled={this.state.disabled}/>
        </div>
        <div className='button'>
          <NextButton  onTouchEnd={this.nextBtnPress.bind(this)} title={'开始'}/>
        </div>
      </Layout>
    )
  }
}