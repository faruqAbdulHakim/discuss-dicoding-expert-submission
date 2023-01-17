import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, className = '' }) {
  return <div className={`border shadow-md rounded-md ${className}`}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
