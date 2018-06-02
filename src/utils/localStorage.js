export default {
  setLocalStorage(key, value, exdays) {
    let curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({data: value, time: curTime, exdays: exdays}))
  },

  getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value === null) {
      return "";
    }
    let data = JSON.parse(value).data
    let time = JSON.parse(value).time
    let exdays = JSON.parse(value).exdays
    if (new Date().getTime() - time > exdays * 24 * 60 * 60 * 1000) {  //过期
      return "";
    }
    return data;
  },

  delLocalStorage(key) {
    localStorage.removeItem(key);
  },

  clearLocalStorage() {
    localStorage.clear();
  },

  setLocalKeyValue(key, value) {
    localStorage.setItem(key, value);
  },

  getLocalByKey(key) {
    return localStorage.getItem(key);
  },

  getLocalWithNoV(key) {
    let value = localStorage.getItem(key);
    if (value === null) {
      return "";
    } else {
      return JSON.parse(value).data;
    }
  }
}
