import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './UI/Card';
import useInput from '../hooks/use-input';
import { asyncCreateComment } from '../states/detailThread/action';

function CreateCommentForm() {
  const {
    value: enteredContent,
    changeHandler: contentChangeHandler,
  } = useInput();
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  if (authUser === null) {
    return (
      <div className="my-2">
        Ingin berkomentar juga? Silahkan
        {' '}
        <Link to="/login" className="underline text-blue-500">login</Link>
        {' '}
        terlebih dahulu
      </div>
    );
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(asyncCreateComment(enteredContent));
  };

  return (
    <Card className="bg-white my-2 p-4">
      <h2 className="text-xl font-semibold">Beri Komentar</h2>
      <form onSubmit={submitHandler} className="py-2">
        <textarea
          name="title"
          placeholder="Tulis sesuatu..."
          className="mt-1 border border-gray-500 rounded-sm px-2 py-1 w-full resize-none"
          rows={3}
          value={enteredContent}
          onChange={contentChangeHandler}
        />
        <button
          type="submit"
          className="block ml-auto mt-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md"
        >
          Beri Komentar
        </button>
      </form>
    </Card>
  );
}

export default CreateCommentForm;
