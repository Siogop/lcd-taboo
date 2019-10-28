import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Score from './ScoreBoard';
import CustomButton from '../components/CustomButton/CustomButton';
import WordsPackage from '../resources/WordsPackages';

function getRandom(arr, number) {
  let n = number;
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) { throw new RangeError('getRandom: more elements taken than available'); }
  while (n) {
    n -= 1;
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    len -= 1;
    taken[x] = len in taken ? taken[len] : len;
  }
  return result;
}

function shuffle(oldArray) {
  let currentIndex = oldArray.length;
  let temporaryValue;
  let randomIndex;
  const array = oldArray;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// const wordsArray = ['Frodo', 'Aramis', 'Piotr Ptak', 'Systemy rozproszone'];
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'wait',
      score: [0, 0],
      round: 1,
      turn: 0,
      words: getRandom(WordsPackage.test, 4).map((word) => ({
        text: word,
        guessed: false,
      })),
      currentIndex: 0,
      startIndex: 0,
    };
    this.onOkClick = this.onOkClick.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.nextWordIndex = this.nextWordIndex.bind(this);
    this.onTurnsEnd = this.onTurnsEnd.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }

  onStartClick() {
    this.setState((state) => ({
      status: 'play',
      startIndex: state.currentIndex,
    }));
  }

  onTurnsEnd() {
    this.setState((state) => {
      const newState = {
        turn: state.turn ? 0 : 1,
        status: 'wait',
      };
      if (state.currentIndex === -1) {
        newState.round = state.round + 1;
        newState.status = newState.round > 3 ? 'end' : 'wait';
        newState.words = shuffle(state.words).map((word) => ({
          text: word.text,
          guessed: false,
        }));
        newState.currentIndex = 0;
      } else {
        newState.startIndex = state.currentIndex;
      }
      return newState;
    });
  }

  onOkClick() {
    this.setState((state) => {
      const words = state.words.map((word, i) => {
        if (i === state.currentIndex) {
          const newWord = word;
          newWord.guessed = true;
          return newWord;
        }
        return word;
      });
      const { score } = state;
      score[state.turn] += 1;
      return {
        words,
        score,
        currentIndex: this.nextWordIndex(state),
      };
    });
  }

  onSkipClick() {
    this.setState((state) => ({
      currentIndex: this.nextWordIndex(state),
    }));
  }

  nextWordIndex(state) {
    let newIndex = -1;
    for (let i = state.currentIndex + 1; i < state.words.length; i += 1) {
      if (!state.words[i].guessed) {
        newIndex = i;
        break;
      }
    }
    if (newIndex === -1) {
      for (let i = 0; i < state.currentIndex; i += 1) {
        if (!state.words[i].guessed) {
          newIndex = i;
          break;
        }
      }
    }
    if (newIndex === -1 || newIndex === state.startIndex) {
      this.onTurnsEnd();
    }
    return newIndex;
  }

  render() {
    const {
      round, score, words, status, turn, currentIndex,
    } = this.state;
    const { onMainMenuClick } = this.props;

    switch (status) {
      case 'play': return (
        <Card
          word={words[currentIndex]}
          round={round}
          onOkClick={this.onOkClick}
          onSkipClick={this.onSkipClick}
          onTurnsEnd={this.onTurnsEnd}
        />
      );
      case 'wait': return (
        <>
          <Score round={round} turn={turn} score={score} />
          <CustomButton handleClick={this.onStartClick} status="primary" text="Start" />
        </>
      );
      default: return (
        <>
          <Score round={round} turn={turn} score={score} />
          <CustomButton handleClick={() => { onMainMenuClick(); }} status="warning" text="Menu główne" />
        </>
      );
    }
  }
}

Game.propTypes = {
  onMainMenuClick: PropTypes.func.isRequired,
};

export default Game;
