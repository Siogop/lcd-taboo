import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30
    };
    this.timesUp = this.timesUp.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((state) => {
      if (state.time === 1) {
        this.timesUp();
      }
      return {time: state.time - 1}});
  }

  timesUp() {
    this.props.onTimesUp();
  }

  render () {
    return(
      <div>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

export default Timer;