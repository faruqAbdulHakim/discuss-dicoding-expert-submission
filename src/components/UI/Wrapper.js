import React from 'react';
import PropTypes from 'prop-types';

function Wrapper({ children, className = '' }) {
  return (
    <div className={`max-w-screen-md mx-auto w-11/12 ${className}`}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
};

export default Wrapper;
