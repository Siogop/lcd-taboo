import React from 'react';
import './Row.scss';
import PropTypes from 'prop-types';

export default function Row({ children }) {
  return (
    <div className="row">
      {children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Row.defaultProps = {
  children: [],
};
