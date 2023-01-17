import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardsPage from './pages/LeaderboardsPage';

function App() {
  const { isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/threads/:threadId" element={<DetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
