import React from 'react';

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
    if (this.props.round === 1) {
      this.setState((state) => {
        if (state.time <= 5) {
          this.timesUp();
        }
        return {
          time: state.time - 5,
        };
      });
    }
    this.props.onSkipClick();
  }

  timesUp() {
    this.props.onTurnsEnd();
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
    return (
      <div>
        <div>
          <p>{this.state.time}</p>
        </div>
        <div>
          {this.props.word.text}
        </div>
        <button onClick={() => { this.props.onOkClick(); }}>OK</button>
        <button onClick={this.onSkipClick}>Pas</button>
      </div>
    );
  }
}

export default Card;