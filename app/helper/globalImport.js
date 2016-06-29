var isService = !process.browser;
import getCookie from './getCookie.js';
import cleanUserCache from './cleanUserCache.js';
import React from 'react';
import Layout from '../components/layout';

import ApiAction from '../actions/apiaction';
import UrlConfig from '../config/urlconfig'
import ApiStore from '../stores/apistore';
import Post from '../actions/ServerPageAction.js';
import ReactDOMServer from 'react-dom/server';
import Toast from '../helper/toast';
import BasePage from '../components/BasePage.js';
import TapAble from 'react-tappable';
import WebUrl from '../config/WebUrl.js';

let main={}
if(isService){
    main=global;

}else{
    main=window;
    window.getCookie=getCookie;
    window.cleanUserCache=cleanUserCache;
}
main.React=React;
main.BasePage=BasePage;
main.Layout=Layout;
main.UrlConfig=UrlConfig;
main.ApiStore=ApiStore;
main.ApiAction=ApiAction;
main.Post=Post;
main.ReactDOMServer=ReactDOMServer;
main.Toast=Toast;
main.TapAble=TapAble;
main.WebUrl=WebUrl;


