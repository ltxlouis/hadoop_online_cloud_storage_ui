import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import {Message} from 'element-ui'

Vue.use(VueRouter);

import Home from '../framework/Home'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import ChgPwd from '../components/ChgPwd'
import Upload from '../components/Upload'
import Main from '../components/Main'
import FileList from '../components/FileList'

import Dev from '../components/Dev'

const NotFound = resolve => require(['../framework/NotFound'], resolve);

const routes = [
  {
    path: '/',
    name: '主页',
    redirect: '/home'
  },
  {
    path: '/frame',
    name: '我的网盘',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/router-test',
        name: 'router 测试',
        component: Main
      },
      {
        path: '/upload',
        name: 'main panel',
        component: Upload
      },
      {
        path: '/home',
        name: '文件主页',
        component: FileList
      }
    ]
  },
  {
    path: '/sign-in',
    name: '登录',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: '注册',
    component: SignUp
  },
  {
    path: '/dev',
    name: 'token',
    component: Dev
  },
  {
    path: '/chg-pwd',
    name: '更改密码',
    component: ChgPwd,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/*',
    name: '404 not found',
    component: NotFound
  }
];

if (window.localStorage.getItem('hcToken')) {
  console.log('页面刷新 method');
  let value = window.localStorage.getItem('hcToken');
  let data = JSON.parse(value).data;
  let time = JSON.parse(value).time;
  let exdays = JSON.parse(value).exdays;
  if (new Date().getTime() - time > exdays * 24 * 60 * 60 * 1000) {
    store.commit('signIn', null);
  } else {
    store.commit('signIn', data);
  }
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem('hcToken')) {
      next();
    }
    else {
      next('/sign-in');
      Message({
        showClose: true,
        message: '用户登录信息失效 请重新登录',
        type: 'error',
        duration: 5000
      });
    }
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
