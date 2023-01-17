import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';
import Card from './UI/Card';

function LeaderboardsList({ leaderboards }) {
  return (
    <Card className="bg-white p-4">
      <div className="max-h-[80vh] overflow-auto">
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem user={leaderboard.user} score={leaderboard.score} />
        ))}
      </div>
    </Card>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape))
    .isRequired,
};

export default LeaderboardsList;
