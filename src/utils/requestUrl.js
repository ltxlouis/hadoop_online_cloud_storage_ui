const HOST = 'http://127.0.0.1:9090';
import apiJson from '@/api.json'

import Vue from 'vue'
import axios from './http'

export function acquireUrl(method, key) {
  return method === 'post' ? HOST + apiJson.post[key].url
    : method === 'get' ? HOST + apiJson.get[key].url : 'error';
}

// export function aPost(key, data) {
//   let url = acquireUrl('post', key);
//   let token = getToken();
//   let config = {
//     headers: {}
//   };
//   config.headers.hcToken = token;
//   Vue.axios.post(url, data, config).then(r => {
//     if (r.data.result.flag == "F") {
//       delToken();
//     }
//   }).catch(e => console.log(e))
// }
//
// export function aGet(key) {
//   let url = acquireUrl('get', key);
//   let token = getToken();
//   let config = {
//     headers: {}
//   };
//   config.headers.hcToken = token;
//   Vue.axios.get(url, config).then(r => {
//     if (r.data.result.flag == "F") {
//       delToken();
//     }
//   }).catch(e => console.log(e))
// }
