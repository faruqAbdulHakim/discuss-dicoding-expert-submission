import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncUpVoteDetailThread,
  toggleDownVoteDetailThreadActionCreator,
  toggleUpVoteDetailThreadActionCreator,
} from './action';
import api from '../../utils/api';

const fakeAuthUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeNeutralThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeUpVotedThread = {
  ...fakeNeutralThread,
  upVotesBy: ['users-1'],
};

const fakeDownVotedThread = {
  ...fakeNeutralThread,
  downVotesBy: ['users-1'],
};

const fakeUpVoteThreadResponse = {
  vote: {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: 1,
  },
};

const fakeNeutralizeThreadResponse = {
  vote: {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: 0,
  },
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncUpVoteDetailThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._neutralizeVoteThread = api.neutralizeVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.neutralizeVoteThread = api._neutralizeVoteThread;

    delete api._upVoteThread;
    delete api._neutralizeVoteThread;
  });

  it('should dispatch and call api correctly if user logged in and fetching success [neutral]', async () => {
    api.upVoteThread = jest.fn().mockResolvedValue(fakeUpVoteThreadResponse);
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      detailThread: fakeNeutralThread,
    });

    await asyncUpVoteDetailThread()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator(fakeAuthUser.id));
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeNeutralThread.id);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch and call api correctly if user logged in and fetching success [upvoted]', async () => {
    api.neutralizeVoteThread = jest.fn().mockResolvedValue(fakeNeutralizeThreadResponse);
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      detailThread: fakeUpVotedThread,
    });

    await asyncUpVoteDetailThread()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator(fakeAuthUser.id));
    expect(api.neutralizeVoteThread).toHaveBeenCalledWith(fakeUpVotedThread.id);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch and call api correctly if user logged in and fetching success [downvoted]', async () => {
    api.upVoteThread = jest.fn().mockResolvedValue(fakeUpVoteThreadResponse);
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      detailThread: fakeDownVotedThread,
    });

    await asyncUpVoteDetailThread()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteDetailThreadActionCreator(fakeAuthUser.id));
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator(fakeAuthUser.id));
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeNeutralThread.id);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch and call alert correctly if user logged in and fetching fail', async () => {
    api.upVoteThread = jest.fn().mockRejectedValue(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      detailThread: fakeNeutralThread,
    });

    await asyncUpVoteDetailThread()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator(fakeAuthUser.id));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly if user is not loggedIn', async () => {
    const getState = () => ({
      authUser: null,
      detailThread: fakeNeutralThread,
    });
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncUpVoteDetailThread()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith('Anda perlu login terlebih dahulu');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
