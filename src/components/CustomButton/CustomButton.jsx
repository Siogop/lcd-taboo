import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.scss';

function getButtonClass(status) {
  switch (status) {
    case 'primary':
      return 'is-primary';
    case 'success':
      return 'is-success';
    case 'warning':
      return 'is-warning';
    case 'error':
      return 'is-error';
    default:
      return '';
  }
}

export default function CustomButton({ handleClick, text, status }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
      className={`custom-button nes-btn ${getButtonClass(status)}`}
    >
      {text}
    </div>
  );
}

CustomButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
