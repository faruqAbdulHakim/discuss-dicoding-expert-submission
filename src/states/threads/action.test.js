import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncCreateThread,
  addThreadActionCreator,
} from './action';
import api from '../../utils/api';

const fakeThreadData = {
  title: 'fake Title',
  body: 'fake Body',
  category: 'fake Category',
};

const fakeCreateThreadResponse = {
  thread: {
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
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asynCreateThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action correctly when fetchin success', async () => {
    api.createThread = () => Promise.resolve(fakeCreateThreadResponse);
    const dispatch = jest.fn();

    await asyncCreateThread(fakeThreadData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeCreateThreadResponse.thread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when fetching fail', async () => {
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncCreateThread(fakeThreadData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
