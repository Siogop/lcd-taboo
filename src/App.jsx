import React from 'react';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import Game from './components/Game';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'menu',
    };

    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onMainMenuClick = this.onMainMenuClick.bind(this);
  }

  onNewGameClick() {
    this.setState({ status: 'game' });
  }

  onSettingsClick() {
    this.setState({ status: 'settings' });
  }

  onMainMenuClick() {
    this.setState({ status: 'menu' });
  }

  render() {
    const { status } = this.state;
    return (
      <div className="App">
        <div className="nes-container is-rounded is-dark">
          <p>LCD Taboo</p>
        </div>
        <div>
          {status === 'menu' && (
          <MainMenu
            onNewGameClick={this.onNewGameClick}
            onSettingsClick={this.onSettingsClick}
          />
          )}
          {status === 'game' && (
          <Game
            onMainMenuClick={this.onMainMenuClick}
          />
          )}
          {status === 'settings' && <Settings />}
        </div>
        <footer />
      </div>
    );
  }
}

export default App;
