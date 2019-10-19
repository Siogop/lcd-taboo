import React from 'react';
import Card from './game/Card';
import Score from './game/ScoreBoard';

const words = ['Frodo', 'Aramis', 'Piotr Ptak', 'Systemy rozproszone'];
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'wait',
      score: [0, 0],
      round: 1,
      turn: 0,
      words: words.map((word) => {
        return { 
          text: word,
          guessed: false
         };
    }),
      currentIndex: 0
    }
    this.onOkClick = this.onOkClick.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.nextWordIndex = this.nextWordIndex.bind(this);
    this.onTurnsEnd = this.onTurnsEnd.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }

  onStartClick() {
    this.setState((state) => {
      return {
        status: 'play'
      }
    })
  }

  onTurnsEnd() {
    this.setState((state) => {
      return {
        turn: state.turn ? 0 : 1,
        status: 'wait'
      };
    })
  }

  nextWordIndex(state) {
    let newIndex = 0;
    for (let i = state.currentIndex + 1; i < state.words.length; i += 1) {
      if (!state.words[i].guessed) {
        newIndex = i;
        break;
      }
    }
    if (!newIndex) {
      for (let i = 0; i < state.currentIndex; i += 1) {
        if (!state.words[i].guessed) {
          newIndex = i;
          break;
        }
      }
    }
    return newIndex;
  }

  onOkClick() {
    this.setState((state) => {
      const words = state.words.map((word, i) => {
        if (i === state.currentIndex) {
          word.guessed = true;
          return word;
        } else {
          return word;
        }
      });
      const score = state.score;
      score[state.turn] += 1;
      return {
        words: words,
        score: score,
        currentIndex: this.nextWordIndex(state)
      };
    })
  }

  onSkipClick() {
    this.setState((state) => {
      return {
        currentIndex: this.nextWordIndex(state)
      };
    })
  }

  render () {
    return(
      <div>
        <h2>Drużyna {this.state.turn + 1}</h2>
        <Score score={this.state.score}/>
        {this.state.status === 'play' &&
        <Card 
          word={this.state.words[this.state.currentIndex]}
          onOkClick={this.onOkClick}
          onSkipClick={this.onSkipClick}
          onTurnsEnd={this.onTurnsEnd}/>}
        {this.state.status !== 'play' &&
        <button onClick={this.onStartClick}>Start</button>}
      </div>
    );
  }
}

export default Game;