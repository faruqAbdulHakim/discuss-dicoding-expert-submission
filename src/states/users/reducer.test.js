import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return the initial state if given unknown action', () => {
    const initialState = [];
    const action = { type: 'unknown' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users if given by users/receive action', () => {
    const initialState = [];
    const action = {
      type: 'users/receive',
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
