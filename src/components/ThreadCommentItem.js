import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from 'react-icons/bs';
import Card from './UI/Card';
import { formatDate } from '../utils';
import { asyncDownVoteComment, asyncUpVoteComment } from '../states/detailThread/action';

function ThreadCommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
}) {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const totalUpvotes = upVotesBy.length;
  const totalDownvotes = downVotesBy.length;

  const isUpvoted = upVotesBy.includes(authUser?.id);
  const isDownvoted = downVotesBy.includes(authUser?.id);

  const upVoteHandler = () => {
    dispatch(asyncUpVoteComment(id));
  };

  const downVoteHandler = () => {
    dispatch(asyncDownVoteComment(id));
  };

  return (
    <div className="border-l-2 pl-4 py-2">
      <Card className="p-4 space-y-4 bg-white">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <p className="text-gray-500 text-sm">
            {formatDate(createdAt)}
          </p>
          <div className="flex gap-2 items-center translate-y-1">
            <img
              src={owner.avatar}
              alt="avatar"
              className="w-5 h-5 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold whitespace-nowrap">{owner.name}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div>
          {HTMLReactParser(content, { trim: true })}
        </div>

        {/* Footer */}
        <div className="mt-2 flex gap-3">
          <button
            type="button"
            className="flex items-center"
            onClick={upVoteHandler}
          >
            {isUpvoted ? <BsCaretUpFill /> : <BsCaretUp />}
            {totalUpvotes}
          </button>
          <button
            type="button"
            className="flex items-center"
            onClick={downVoteHandler}
          >
            {isDownvoted ? <BsCaretDownFill /> : <BsCaretDown />}
            {totalDownvotes}
          </button>
        </div>
      </Card>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentItem.propTypes = {
  ...commentShape,
};

export default ThreadCommentItem;
