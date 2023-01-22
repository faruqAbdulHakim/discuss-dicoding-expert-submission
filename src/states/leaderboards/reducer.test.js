import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state if given unknown action', () => {
    const initialState = [];
    const action = { type: 'unknown' };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards if given by leaderboards/set action', () => {
    const initialState = [];
    const action = {
      type: 'leaderboards/set',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
