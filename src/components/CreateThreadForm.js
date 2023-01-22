import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './UI/Card';
import Input from './UI/Input';
import useInput from '../hooks/use-input';
import { asyncCreateThread } from '../states/threads/action';

function CreateThreadForm() {
  const {
    value: enteredTitle,
    changeHandler: titleChangeHandler,
  } = useInput();
  const {
    value: enteredCategory,
    changeHandler: categoryChangeHandler,
  } = useInput();
  const {
    value: enteredBody,
    changeHandler: bodyChangeHandler,
  } = useInput();
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  if (authUser === null) {
    return (
      <div className="my-2">
        Ingin menuliskan sesuatu juga? Silahkan
        {' '}
        <Link to="/login" className="underline text-blue-500">login</Link>
        {' '}
        terlebih dahulu
      </div>
    );
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(asyncCreateThread({
      title: enteredTitle,
      body: enteredBody,
      category: enteredCategory,
    }));
  };

  return (
    <Card className="bg-white my-2 p-4">
      <h2 className="text-xl font-semibold">Tulis</h2>
      <form data-testid="create-thread-form" onSubmit={submitHandler} className="py-2">
        <Input
          type="text"
          name="title"
          placeholder="Masukkan judul..."
          value={enteredTitle}
          onChangeHandler={titleChangeHandler}
        />
        <Input
          type="text"
          name="title"
          placeholder="Masukkan kategori..."
          value={enteredCategory}
          onChangeHandler={categoryChangeHandler}
        />
        <textarea
          name="title"
          placeholder="Tulis sesuatu..."
          className="mt-1 border border-gray-500 rounded-sm px-2 py-1 w-full resize-none"
          rows={5}
          value={enteredBody}
          onChange={bodyChangeHandler}
        />
        <button
          type="submit"
          className="block ml-auto mt-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md"
        >
          Tulis
        </button>
      </form>
    </Card>
  );
}

export default CreateThreadForm;
