import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncGetLeaderboards, receiveLeaderboardsActionCreator } from './action';
import api from '../../utils/api';

const fakeLeaderboardsResponse = {
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
  ],
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when fetchin success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = jest.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse.leaderboards),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when fetching fail', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
