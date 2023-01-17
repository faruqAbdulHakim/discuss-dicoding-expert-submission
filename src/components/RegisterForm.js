import React from 'react';
import PropTypes from 'prop-types';
import Card from './UI/Card';
import Input from './UI/Input';
import useInput from '../hooks/use-input';

function RegisterForm({ onRegister }) {
  const {
    value: enteredName,
    changeHandler: nameChangeHandler,
  } = useInput();
  const {
    value: enteredEmail,
    changeHandler: emailChangeHandler,
  } = useInput();
  const {
    value: enteredPassword,
    changeHandler: passwordChangeHandler,
  } = useInput();
  const {
    value: enteredPasswordConfirmation,
    changeHandler: passwordConfirmationChangeHandler,
  } = useInput();

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredPassword.length < 6) {
      alert('Password harus memiliki setidaknya 6 karakter');
      return;
    }

    if (enteredPassword !== enteredPasswordConfirmation) {
      alert('Konfirmasi password tidak sesuai');
      return;
    }

    onRegister({ name: enteredName, email: enteredEmail, password: enteredPassword });
  };

  return (
    <Card className="bg-white grid grid-cols-[1.5fr,minmax(0,1fr)] overflow-hidden">
      <form onSubmit={submitHandler} className="p-4 min-w-[320px] flex flex-col gap-2">
        <Input
          id="name"
          name="name"
          label="Nama"
          placeholder="Masukkan nama"
          required
          value={enteredName}
          onChangeHandler={nameChangeHandler}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Masukkan email"
          required
          value={enteredEmail}
          onChangeHandler={emailChangeHandler}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Masukkan password"
          required
          value={enteredPassword}
          onChangeHandler={passwordChangeHandler}
        />
        <Input
          id="password-confirmation"
          name="password-confirmation"
          type="password"
          label="Konfirmasi Password"
          placeholder="Masukkan ulang password"
          required
          value={enteredPasswordConfirmation}
          onChangeHandler={passwordConfirmationChangeHandler}
        />
        <button type="submit" className="mt-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white w-full px-4 py-2 rounded-sm">
          Daftar
        </button>
      </form>
      <div className="bg-gradient-to-tr from-blue-400 to-violet-400 overflow-hidden" />
    </Card>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
