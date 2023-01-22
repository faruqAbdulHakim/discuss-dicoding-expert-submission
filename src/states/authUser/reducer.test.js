import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state if given unknown action', () => {
    const initialState = [];
    const action = { type: 'unknown' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser if given by authUser/set action', () => {
    const initialState = [];
    const action = {
      type: 'authUser/set',
      payload: {
        authUser: {
          id: 'fake-id',
          name: 'fake-name',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null if given by authUser/unset action', () => {
    const initialState = [];
    const action = { type: 'authUser/unset' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
