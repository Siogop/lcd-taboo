import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

function getProgressColor(value, maxValue) {
  const percentage = (value / maxValue) * 100;
  if (percentage <= 20) {
    return 'is-error';
  }
  if (percentage <= 40) {
    return 'is-warning';
  }
  if (percentage <= 60) {
    return 'is-success';
  }
  if (percentage <= 80) {
    return 'is-primary';
  }
  return '';
}

export default function ProgressBar({ value, maxValue }) {
  return (
    <div className="progress__wrapper">
      <progress
        className={`nes-progress ${getProgressColor(value, maxValue)} progress__bar`}
        value={value}
        max={maxValue}
      />
      <div className="progress__overlay">
        {value}
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.number,
};

ProgressBar.defaultProps = {
  value: 0,
  maxValue: 100,
};
