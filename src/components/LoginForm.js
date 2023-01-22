import React from 'react';
import PropTypes from 'prop-types';
import Card from './UI/Card';
import useInput from '../hooks/use-input';
import Input from './UI/Input';

function LoginForm({ onLogin }) {
  const {
    value: enteredEmail,
    changeHandler: emailChangeHandler,
  } = useInput();
  const {
    value: enteredPassword,
    changeHandler: passwordChangeHandler,
  } = useInput();

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin({ email: enteredEmail, password: enteredPassword });
  };

  return (
    <Card className="bg-white grid grid-cols-[1.5fr,minmax(0,1fr)] overflow-hidden">
      <form onSubmit={submitHandler} className="p-4 min-w-[320px] flex flex-col gap-2">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Masukkan email"
          value={enteredEmail}
          onChangeHandler={emailChangeHandler}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Masukkan password"
          value={enteredPassword}
          onChangeHandler={passwordChangeHandler}
        />
        <button type="submit" className="mt-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white w-full px-4 py-2 rounded-sm">
          Masuk
        </button>
      </form>
      <div className="bg-gradient-to-tr from-blue-400 to-violet-400 overflow-hidden" />
    </Card>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
