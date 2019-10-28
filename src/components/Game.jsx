import React from 'react';
import PropTypes from 'prop-types';
import Card from './game/Card';
import Score from './game/ScoreBoard';
import CustomButton from './CustomButton';
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
function nextWordIndex(state) {
  let newIndex = -1;
  for (let i = state.currentIndex + 1; i < state.words.length; i += 1) {
    if (!state.words[i].guessed) {
      newIndex = i;
      break;
    }
  }
  if (newIndex === -1) {
    for (let i = 0; i <= state.currentIndex; i += 1) {
      if (!state.words[i].guessed) {
        newIndex = i;
        break;
      }
    }
  }
  return newIndex;
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
        visited: false,
      })),
      currentIndex: 0,
    };
    this.onOkClick = this.onOkClick.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.onTurnsEnd = this.onTurnsEnd.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }

  componentDidUpdate() {
    const { currentIndex, words } = this.state;
    if (currentIndex === -1) {
      this.onTurnsEnd();
    } else if (words[currentIndex].visited) {
      this.onTurnsEnd();
    }
  }

  onStartClick() {
    this.setState({
      status: 'play',
    });
  }

  onTurnsEnd() {
    this.setState((state) => {
      const newState = {
        turn: state.turn ? 0 : 1,
        status: 'wait',
        words: state.words.map((word) => ({
          text: word.text,
          guessed: word.guessed,
          visited: false,
        })),
      };
      if (state.currentIndex === -1) {
        newState.round = state.round + 1;
        newState.status = newState.round > 3 ? 'end' : 'wait';
        newState.words = shuffle(state.words).map((word) => ({
          text: word.text,
          guessed: false,
          visited: false,
        }));
        newState.currentIndex = 0;
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
          newWord.visited = true;
          return newWord;
        }
        return word;
      });
      const { score } = state;
      score[state.turn] += 1;
      return {
        words,
        score,
        currentIndex: nextWordIndex(state),
      };
    });
  }

  onSkipClick() {
    this.setState((state) => ({
      words: state.words.map((word, i) => {
        if (i === state.currentIndex) {
          const newWord = word;
          newWord.guessed = word.guessed;
          newWord.visited = true;
          return newWord;
        }
        return word;
      }),
      currentIndex: nextWordIndex(state),
    }));
  }

  render() {
    const {
      round, score, words, status, turn, currentIndex,
    } = this.state;
    const { onMainMenuClick } = this.props;
    return (
      <div>
        <h2>{`Runda ${round}`}</h2>
        <h3>{`Drużyna ${turn + 1}`}</h3>
        <Score score={score} />
        {status === 'play' && currentIndex >= 0
        && (
        <Card
          word={words[currentIndex]}
          round={round}
          onOkClick={this.onOkClick}
          onSkipClick={this.onSkipClick}
          onTurnsEnd={this.onTurnsEnd}
        />
        )}
        <div>
          {status === 'wait'
          && <CustomButton handleClick={this.onStartClick} status="primary" text="Start" />}
        </div>
        <div>
          {status !== 'play'
          && <CustomButton handleClick={() => { onMainMenuClick(); }} status="warning" text="Menu główne" />}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  onMainMenuClick: PropTypes.func.isRequired,
};

export default Game;
