import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineComment } from 'react-icons/ai';
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from 'react-icons/bs';
import HTMLReactParser from 'html-react-parser';
import Card from './UI/Card';
import { formatDate } from '../utils';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
}) {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalUpvotes = upVotesBy.length;
  const totalDownvotes = downVotesBy.length;

  const isUpvoted = upVotesBy.includes(authUser?.id);
  const isDownvoted = downVotesBy.includes(authUser?.id);

  const upVoteHandler = () => {
    dispatch(asyncUpVoteThread(id));
  };

  const downVoteHandler = () => {
    dispatch(asyncDownVoteThread(id));
  };

  const showCommentHandler = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <Card className="bg-white p-4">
      {/* Header */}
      <p className="inline-block bg-slate-200 rounded-sm text-sm px-2 py-0.5">
        {`#${category}`}
      </p>
      <div className="mt-2 flex flex-col lg:flex-row justify-between items-start lg:gap-4">
        <div>
          <h3 className="text-xl font-bold">
            <Link to={`/threads/${id}`} className="hover:text-blue-400">
              {title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(createdAt)}
          </p>
        </div>
        <div className="flex gap-2 items-center translate-y-1">
          <img
            src={owner.avatar}
            alt="avatar"
            className="w-5 h-5 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold whitespace-nowrap">
              {owner.name}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4">
        {HTMLReactParser(body.length > 250 ? `${body.slice(0, 250)}...` : body, { trim: true })}
      </div>

      {/* Footer */}
      <div className="mt-2 flex gap-3">
        <button type="button" className="flex items-center" onClick={upVoteHandler}>
          {
            isUpvoted
              ? <BsCaretUpFill />
              : <BsCaretUp />
          }
          {totalUpvotes}
        </button>
        <button type="button" className="flex items-center" onClick={downVoteHandler}>
          {
            isDownvoted
              ? <BsCaretDownFill />
              : <BsCaretDown />
          }
          {totalDownvotes}
        </button>
        <button type="button" className="flex items-center" onClick={showCommentHandler}>
          <AiOutlineComment />
          {totalComments}
        </button>
      </div>
    </Card>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export default ThreadItem;
