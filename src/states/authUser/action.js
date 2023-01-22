import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
};

function setAuthUserActionCreator(authUser) {
  return { type: ActionType.SET_AUTH_USER, payload: { authUser } };
}

function unsetAuthUserActionCreator() {
  return { type: ActionType.UNSET_AUTH_USER };
}

function asyncUserLogin({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { token } = await api.login({ email, password });
      api.putAccessToken(token);
      const { user: authUser } = await api.getMe();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUserLogout() {
  return async (dispatch) => {
    dispatch(showLoading());
    api.removeAccessToken();
    dispatch(unsetAuthUserActionCreator());
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncUserLogin,
  asyncUserLogout,
};
