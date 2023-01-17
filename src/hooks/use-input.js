import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const reset = () => {
    setValue('');
    setTouched(false);
  };

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setTouched(true);
  };

  return {
    value,
    touched,
    reset,
    changeHandler,
    blurHandler,
  };
}

export default useInput;
