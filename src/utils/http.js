import axios from 'axios'
import store from '../vuex/store'
import * as types from '../vuex/types'
import router from '../router/index'
import local from './localStorage'
import {Message} from 'element-ui'

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://127.0.0.1:9090';

axios.interceptors.request.use(
  config => {
    if (local.getLocalStorage('hcToken')) {
      config.headers.hcToken = local.getLocalStorage('hcToken');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//TODO
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.SIGNOUT);
          router.replace({
            path: 'sign-in'
          });
          Message({
            showClose: true,
            message: '401 请重新登录',
            type: 'error',
            duration: 5000
          });
      }
    }
    return Promise.reject(error.response.data)
  });

export default axios;
