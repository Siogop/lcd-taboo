import React from 'react';
import PropTypes from 'prop-types';

export default function ScoreBoard({ score, round, turn }) {
  return (
    <div>
      <h2>{`Runda ${round}`}</h2>
      <h3>{`Drużyna ${turn + 1}`}</h3>
      <div>
        {`${score[0]} - ${score[1]}`}
      </div>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
};
