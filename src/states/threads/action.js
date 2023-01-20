import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'thread/add',
  TOGGLE_UP_VOTE_THREAD: 'thread/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD: 'thread/toggleDownVote',
};

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

function toggleUpVoteThreadActionCreator(userId, threadId) {
  return { type: ActionType.TOGGLE_UP_VOTE_THREAD, payload: { userId, threadId } };
}

function toggleDownVoteThreadActionCreator(userId, threadId) {
  return { type: ActionType.TOGGLE_DOWN_VOTE_THREAD, payload: { userId, threadId } };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { thread } = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleUpVoteThreadActionCreator(authUser.id, threadId));
        const threadItem = threads.find((thread) => thread.id === threadId);
        const isUpVoted = threadItem.upVotesBy.includes(authUser.id);
        const isDownVoted = threadItem.downVotesBy.includes(authUser.id);
        if (isDownVoted) {
          await dispatch(toggleDownVoteThreadActionCreator(authUser.id, threadId));
        }
        if (!isUpVoted) {
          await api.upVoteThread(threadId);
        }
        if (isUpVoted) {
          await api.neutralizeVoteThread(threadId);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator(authUser.id, threadId));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleDownVoteThreadActionCreator(authUser.id, threadId));
        const threadItem = threads.find((thread) => thread.id === threadId);
        const isUpVoted = threadItem.upVotesBy.includes(authUser.id);
        const isDownVoted = threadItem.downVotesBy.includes(authUser.id);
        if (isUpVoted) {
          dispatch(toggleUpVoteThreadActionCreator(authUser.id, threadId));
        }
        if (!isDownVoted) {
          await api.downVoteThread(threadId);
        }
        if (isDownVoted) {
          await api.neutralizeVoteThread(threadId);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator(authUser.id, threadId));
      }
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
};
