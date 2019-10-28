import React from 'react';
import PropTypes from 'prop-types';

export default function CustomButton({ handleClick, text }) {
  return (
    <div>
      <div role="button" tabIndex={0} onClick={handleClick} onKeyPress={handleClick}>{text}</div>
    </div>
  );
}

CustomButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
