import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import * as actions from './actions'
import * as getters from './getters'
import localStorage from "../utils/localStorage"

Vue.use(Vuex);

const state = {
  id: '',
  token: null,
  title: '',
  dirId: '',
  addFolder: true,
  newFolderName: '',
  refreshFileList: true,
  showDelete: false,
  search: false,
  searchText: ''
};

const mutations = {
  [types.SIGNIN]: (state, data) => {
    localStorage.setLocalStorage('hcToken', data, 20);
    state.token = data;
  },
  [types.SIGNOUT]: (state) => {
    localStorage.delLocalStorage('hcToken');
    state.token = null;
  },
  [types.TITLE]: (state, data) => {
    state.title = data;
  },
  [types.SETID]: (state, data) => {
    state.id = data;
  },
  [types.SETDIRID]: (state, data) => {
    state.dirId = data;
  },
  [types.ADDFOLDER]: (state, data) => {
    state.addFolder = !state.addFolder;
    state.newFolderName = data
  },
  [types.REFRESHFILELIST]: (state) => {
    state.refreshFileList = !state.refreshFileList;
  },
  showDelete: (state) => {
    state.showDelete = !state.showDelete;
  },
  search: (state, data) => {
    state.search = !state.search
    state.searchText = data
  }
};

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
