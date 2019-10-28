import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../CustomButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import Tile from '../Tile/Tile';
import Row from '../Row/Row';

const MAX_TIMER = 30;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: MAX_TIMER,
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
    const { word, onOkClick } = this.props;
    const { time } = this.state;
    return (
      <div>
        <Tile text={word.text} />
        <Row>
          <CustomButton handleClick={() => { onOkClick(); }} status="success" text="OK" />
          <CustomButton handleClick={this.onSkipClick} status="error" text="Pas" />
        </Row>
        <ProgressBar value={time} maxValue={MAX_TIMER} />
      </div>
    );
  }
}

Card.propTypes = {
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
