import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';

const fakeGetMeResponse = {
  user: {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getMe = api.getMe;
  });

  afterEach(() => {
    api.getMe = api._getMe;

    delete api._getMe;
  });

  it('should dispatch action correctly when fetching success', async () => {
    api.getMe = () => Promise.resolve(fakeGetMeResponse);
    const dispatch = jest.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetMeResponse.user));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correcty when fetching fail', async () => {
    api.getMe = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
