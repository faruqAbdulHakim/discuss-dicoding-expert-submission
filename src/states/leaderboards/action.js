import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'leaderboards/set',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return { type: ActionType.RECEIVE_LEADERBOARDS, payload: { leaderboards } };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { leaderboards } = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncGetLeaderboards,
};
