import React from 'react';
import Timer from './Timer';

class Card extends React.Component {
  render () {
    return(
      <div>
        <Timer onTimesUp={()=>{this.props.onTurnsEnd();}}/>
        <div>
          {this.props.word.text}
        </div>
        <button onClick={() => {this.props.onOkClick();}}>OK</button>
        <button onClick={() => {this.props.onSkipClick();}}>Pas</button>
      </div>
    );
  }
}

export default Card;