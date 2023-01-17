import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Wrapper from '../components/UI/Wrapper';
import { asyncUserLogin } from '../states/authUser/action';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser !== null) {
      navigate('/');
    }
  }, [authUser]);

  const loginHandler = ({ email, password }) => {
    dispatch(asyncUserLogin({ email, password }));
  };

  return (
    <Wrapper className="space-y-4 py-4">
      <Link to="/" className="flex gap-2 items-center">
        <AiOutlineArrowLeft />
        Home
      </Link>
      <h1 className="text-2xl font-bold">
        Login
      </h1>
      <LoginForm onLogin={loginHandler} />
      <p className="text-sm">
        Belum punya akun?
        {' '}
        <Link to="/register" className="text-blue-700 hover:text-blue-500 underline">Daftar disini</Link>
      </p>
    </Wrapper>
  );
}

export default LoginPage;
