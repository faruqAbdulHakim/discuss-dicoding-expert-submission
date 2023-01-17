const { showLoading, hideLoading } = require('react-redux-loading-bar');
const { default: api } = require('../../utils/api');

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return { type: ActionType.RECEIVE_DETAIL_THREAD, payload: { detailThread } };
}

function toggleUpVoteDetailThreadActionCreator(userId) {
  return { type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD, payload: { userId } };
}

function toggleDownVoteDetailThreadActionCreator(userId) {
  return { type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD, payload: { userId } };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function toggleUpVoteCommentActionCreator(userId, commentId) {
  return { type: ActionType.TOGGLE_UP_VOTE_COMMENT, payload: { userId, commentId } };
}

function toggleDownVoteCommentActionCreator(userId, commentId) {
  return { type: ActionType.TOGGLE_DOWN_VOTE_COMMENT, payload: { userId, commentId } };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { detailThread } = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));
        const isUpVoted = detailThread.upVotesBy.includes(authUser.id);
        const isDownVoted = detailThread.downVotesBy.includes(authUser.id);
        if (isDownVoted) {
          await dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));
        }
        if (!isUpVoted) {
          await api.upVoteThread(detailThread.id);
        }
        if (isUpVoted) {
          await api.neutralizeVoteThread(detailThread.id);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));
        const isUpVoted = detailThread.upVotesBy.includes(authUser.id);
        const isDownVoted = detailThread.downVotesBy.includes(authUser.id);
        if (isUpVoted) {
          dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));
        }
        if (!isDownVoted) {
          await api.downVoteThread(detailThread.id);
        }
        if (isDownVoted) {
          await api.neutralizeVoteThread(detailThread.id);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { detailThread } = getState();

    try {
      const { comment } = await api.createComment(detailThread.id, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleUpVoteCommentActionCreator(authUser.id, commentId));
        const commentItem = detailThread.comments.find((comment) => comment.id === commentId);
        const isUpVoted = commentItem.upVotesBy.includes(authUser.id);
        const isDownVoted = commentItem.downVotesBy.includes(authUser.id);
        if (isDownVoted) {
          await dispatch(toggleDownVoteCommentActionCreator(authUser.id, commentId));
        }
        if (!isUpVoted) {
          await api.upVoteComment(detailThread.id, commentId);
        }
        if (isUpVoted) {
          await api.neutralizeVoteComment(detailThread.id, commentId);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteCommentActionCreator(authUser.id, commentId));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('Anda perlu login terlebih dahulu');
    }
    if (authUser !== null) {
      try {
        dispatch(toggleDownVoteCommentActionCreator(authUser.id, commentId));
        const commentItem = detailThread.comments.find((comment) => comment.id === commentId);
        const isUpVoted = commentItem.upVotesBy.includes(authUser.id);
        const isDownVoted = commentItem.downVotesBy.includes(authUser.id);
        if (isUpVoted) {
          dispatch(toggleUpVoteCommentActionCreator(authUser.id, commentId));
        }
        if (!isDownVoted) {
          await api.downVoteComment(detailThread.id, commentId);
        }
        if (isDownVoted) {
          await api.neutralizeVoteComment(detailThread.id, commentId);
        }
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteCommentActionCreator(authUser.id, commentId));
      }
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
