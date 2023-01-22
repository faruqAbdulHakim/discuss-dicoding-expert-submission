import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state if given unknown action', () => {
    const initialState = [];
    const action = { type: 'unknown' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return isPreload if given by isPreload/set action', () => {
    const initialState = [];
    const action = {
      type: 'isPreload/set',
      payload: {
        isPreload: true,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
