import React from 'react';
import Timer from './game/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      turn: 1
    }
  }
  render () {
    return(
      <div>
        <h2>Gra</h2>
        <Timer onTimesUp={()=>{alert('Times up')}}/>
      </div>
    );
  }
}

export default Game;