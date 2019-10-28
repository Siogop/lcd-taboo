import React from 'react';
import PropTypes from 'prop-types';
import './Tile.scss';

export default function Tile({ text }) {
  return (
    <div className="tile nes-container is-rounded is-centered">
      {text}
    </div>
  );
}

Tile.propTypes = {
  text: PropTypes.string.isRequired,
};
