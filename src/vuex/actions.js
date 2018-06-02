import * as types from './types'

export const signIn = ({commit}, data) => {
  commit(types.SIGNIN, data);
};

export const signOut = ({commit}) => {
  commit(types.SIGNOUT);
};

export const setId = ({commit}, data) => {
  commit(types.SETID, data);
};

export const setDirId = ({commit}, data) => {
  commit(types.SETDIRID, data);
};
