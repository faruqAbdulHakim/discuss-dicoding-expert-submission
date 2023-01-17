import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Wrapper from '../components/UI/Wrapper';
import { asyncUserRegister } from '../states/users/action';

function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser !== null) {
      navigate('/');
    }
  }, [authUser]);

  const registerHandler = ({ name, email, password }) => {
    dispatch(asyncUserRegister({ name, email, password }));

    navigate('/login');
  };

  return (
    <Wrapper className="space-y-4 py-4">
      <Link to="/" className="flex gap-2 items-center">
        <AiOutlineArrowLeft />
        Home
      </Link>
      <h1 className="text-2xl font-bold">
        Register
      </h1>
      <RegisterForm onRegister={registerHandler} />
      <p className="text-sm">
        Sudah punya akun?
        {' '}
        <Link to="/login" className="text-blue-700 hover:text-blue-500 underline">Masuk</Link>
      </p>
    </Wrapper>
  );
}

export default RegisterPage;
