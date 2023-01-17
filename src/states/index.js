import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import detailThreadReducer from './detailThread/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    detailThread: detailThreadReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    users: usersReducer,
  },
});

export default store;
