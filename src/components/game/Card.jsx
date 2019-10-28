import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../CustomButton';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.timesUp = this.timesUp.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onSkipClick() {
    const { round, onSkipClick } = this.props;
    if (round === 1) {
      this.setState((state) => {
        if (state.time <= 5) {
          this.timesUp();
        }
        return {
          time: state.time - 5,
        };
      });
    }
    onSkipClick();
  }

  timesUp() {
    const { onTurnsEnd } = this.props;
    onTurnsEnd();
  }

  tick() {
    this.setState((state) => {
      if (state.time <= 1) {
        this.timesUp();
      }
      return { time: state.time - 1 };
    });
  }

  render() {
    const { time, word, onOkClick } = this.props;
    return (
      <div>
        <div>
          <p>{time}</p>
        </div>
        <div>
          {word.text}
        </div>
        <CustomButton handleClick={() => { onOkClick(); }} text="OK" />
        <CustomButton handleClick={this.onSkipClick} text="Pas" />
      </div>
    );
  }
}

Card.propTypes = {
  time: PropTypes.number.isRequired,
  word: PropTypes.shape({
    text: PropTypes.string,
    guessed: PropTypes.bool,
  }).isRequired,
  onOkClick: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  onSkipClick: PropTypes.func.isRequired,
  onTurnsEnd: PropTypes.func.isRequired,
};

export default Card;
