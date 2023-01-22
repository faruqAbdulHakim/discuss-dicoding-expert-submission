import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncUserLogin,
  asyncUserLogout,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';
import api from '../../utils/api';

const fakeLoginResponse = {
  token: 'fake-jwt-token',
};

const fakeGetMeResponse = {
  user: {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncUserLogin thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getMe = api.getMe;
  });

  afterEach(() => {
    api.login = api._login;
    api.getMe = api._getMe;

    delete api._login;
    delete api._getMe;
  });

  it('should dispatch action correctly if login success', async () => {
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getMe = () => Promise.resolve(fakeGetMeResponse);
    const dispatch = jest.fn();
    const spy = jest.spyOn(api, 'putAccessToken');

    await asyncUserLogin({
      email: 'fake-email@mail.com',
      password: '123456',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(spy).toHaveBeenCalledWith(fakeLoginResponse.token);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetMeResponse.user));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly if login fail', async () => {
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getMe = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncUserLogin({
      email: 'fake-email',
      password: '123456',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUserLogout thunk', () => {
  it('should dispatch action correctly', async () => {
    const dispatch = jest.fn();
    const spy = jest.spyOn(api, 'removeAccessToken');

    await asyncUserLogout()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
