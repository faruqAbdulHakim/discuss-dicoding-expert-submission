import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncUserRegister } from './action';
import api from '../../utils/api';

const fakeUserData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: '12345678',
};

const fakeRegisterResponse = {
  user: {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncUserRegister thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when fetching success', async () => {
    api.register = () => Promise.resolve(fakeRegisterResponse);
    const dispatch = jest.fn();

    await asyncUserRegister(fakeUserData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when fetching fail', async () => {
    api.register = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncUserRegister(fakeUserData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
