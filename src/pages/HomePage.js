import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../components/AppBar';
import CreateThreadForm from '../components/CreateThreadForm';
import ThreadsList from '../components/ThreadsList';
import Wrapper from '../components/UI/Wrapper';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, []);

  const threadsList = threads.map((thread) => (
    {
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }
  ));

  return (
    <Wrapper>
      <AppBar />
      <CreateThreadForm />
      <ThreadsList threads={threadsList} />
    </Wrapper>
  );
}

export default HomePage;
