import React from 'react';

class Card extends React.Component {
  render () {
    return(
      <div>
        <button onClick={this.newGameClick}>OK</button>
        <button onClick={this.settingsClick}>Pas</button>
      </div>
    );
  }
}

export default Card;