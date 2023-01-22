import threadsReducer from './reducer';

const fakeThreads = [
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
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe('threadsReducer function', () => {
  it('should return the initial state if given unknown action', () => {
    const initialState = [];
    const action = { type: 'unknown' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads if given by threads/receive action', () => {
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: {
        threads: fakeThreads,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with extra 1 thread if given by thread/add action', () => {
    const initialState = [fakeThreads[0]];
    const action = {
      type: 'thread/add',
      payload: {
        thread: fakeThreads[1],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([fakeThreads[1], fakeThreads[0]]);
  });

  it('should return the threads with toggled upVote if given by thread/toggleUpVote action', () => {
    const initialState = [fakeThreads[0]];
    const action = {
      type: 'thread/toggleUpVote',
      payload: {
        threadId: fakeThreads[0].id,
        userId: 'fake-userId',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...fakeThreads[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with toggled downVote if given by thread/toggleDownVote action', () => {
    const initialState = [fakeThreads[0]];
    const action = {
      type: 'thread/toggleDownVote',
      payload: {
        threadId: fakeThreads[0].id,
        userId: 'fake-userId',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...fakeThreads[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });
});
