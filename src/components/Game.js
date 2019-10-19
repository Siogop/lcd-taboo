import React from 'react';
import Card from './game/Card';

const words = ['Frodo', 'Aramis', 'Piotr Ptak', 'Systemy rozproszone'];
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      turn: 1,
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
      return {
        words: words,
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
        <h2>Gra</h2>
        <Card 
          word={this.state.words[this.state.currentIndex]}
          onOkClick={this.onOkClick}
          onSkipClick={this.onSkipClick}/>
      </div>
    );
  }
}

export default Game;