import React from 'react';
import PropTypes from 'prop-types';

export default function ScoreBoard({ score }) {
  return (
    <div>
      <div>
        {`${score[0]} - ${score[1]}`}
      </div>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
};
