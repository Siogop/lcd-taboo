import React from 'react';

class ScoreBoard extends React.Component {
  render () {
    return(
      <div>
        <div>
          {this.props.score[0]} - {this.props.score[1]}
        </div>
      </div>
    );
  }
}

export default ScoreBoard;