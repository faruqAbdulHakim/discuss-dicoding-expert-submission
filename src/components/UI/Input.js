import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  label,
  type,
  name,
  value,
  required,
  placeholder,
  onChangeHandler,
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        required={required}
        className="mt-1 border border-gray-500 rounded-sm px-2 py-1"
      />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

Input.defaultProps = {
  id: undefined,
  label: undefined,
  placeholder: undefined,
  type: 'text',
  name: undefined,
  required: false,
};

export default Input;
