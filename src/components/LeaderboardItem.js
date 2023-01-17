import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="border-b p-4 flex justify-between">
      <div className="flex items-center gap-2">
        <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <p>{user.name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

export const leaderboardItemShape = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export default LeaderboardItem;
