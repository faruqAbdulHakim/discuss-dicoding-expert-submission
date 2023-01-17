import React from 'react';
import PropTypes from 'prop-types';
import ThreadCommentItem, { commentShape } from './ThreadCommentItem';

function ThreadDetailCommentsList({ comments }) {
  return (
    <div className="pl-4 py-4">
      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
        />
      ))}
    </div>
  );
}

ThreadDetailCommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};

export default ThreadDetailCommentsList;
