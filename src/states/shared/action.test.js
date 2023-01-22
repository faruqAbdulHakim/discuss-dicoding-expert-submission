import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { asyncPopulateUsersAndThreads } from './action';
import api from '../../utils/api';

const fakeThreadsResponse = {
  threads: [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ],
};

const fakeUsersResponse = {
  users: [
    {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  ],
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it('should dispatch action correctly when fetching success', async () => {
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    const dispatch = jest.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse.threads));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse.users));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when fetching fail', async () => {
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
