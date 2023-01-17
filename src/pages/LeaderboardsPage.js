import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../components/AppBar';
import LeaderboardsList from '../components/LeaderboardsList';
import Wrapper from '../components/UI/Wrapper';
import { asyncGetLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, []);

  return (
    <Wrapper>
      <AppBar />
      <LeaderboardsList leaderboards={leaderboards} />
    </Wrapper>
  );
}

export default LeaderboardsPage;
