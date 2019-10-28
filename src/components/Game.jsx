import React from 'react';
import PropTypes from 'prop-types';
import Card from './game/Card';
import Score from './game/ScoreBoard';
import CustomButton from './CustomButton';

const wordsArray = ['Frodo', 'Aramis', 'Piotr Ptak', 'Systemy rozproszone'];
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'wait',
      score: [0, 0],
      round: 1,
      turn: 0,
      words: wordsArray.map((word) => ({
        text: word,
        guessed: false,
      })),
      currentIndex: 0,
      // startIndex: 0,
    };
    this.onOkClick = this.onOkClick.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.nextWordIndex = this.nextWordIndex.bind(this);
    this.onTurnsEnd = this.onTurnsEnd.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }

  onStartClick() {
    this.setState({
      status: 'play',
      // startIndex: state.currentIndex,
    });
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
        newState.words = state.words.map((word) => ({
          text: word.text,
          guessed: false,
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
