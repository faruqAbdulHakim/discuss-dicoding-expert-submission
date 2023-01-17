import React from 'react';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUserLogout } from '../states/authUser/action';

function AppBar() {
  const { authUser = null } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthed = authUser !== null;

  const logoutHandler = () => {
    dispatch(asyncUserLogout());
    navigate('/login');
  };

  return (
    <div className="py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">
        <Link to="/">Discuss</Link>
      </h1>
      <div className="flex gap-4 items-center">
        <Link
          to="/leaderboards"
          className="flex gap-1 items-center hover:text-blue-500"
        >
          <MdOutlineLeaderboard />
          Leaderboards
        </Link>
        {isAuthed ? (
          <button type="button" onClick={logoutHandler} className="flex gap-1 items-center hover:text-blue-500">
            <BiLogOut />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex gap-1 items-center hover:text-blue-500"
          >
            <BiLogIn />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default AppBar;
