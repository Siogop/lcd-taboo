import React from 'react';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import Game from './components/Game';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'menu'
    }

    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onMainMenuClick = this.onMainMenuClick.bind(this);
  }
  onNewGameClick() {
    this.setState({status: 'game'});
  }
  onSettingsClick() {
    this.setState({status: 'settings'});
  }
  onMainMenuClick() {
    this.setState({status: 'menu'});
  }
  render() {
    const status = this.state.status;
    return (
      <div className="App">
        <h1>LCD Taboo</h1>
        <div>
          {status === 'menu' && <MainMenu 
            onNewGameClick={this.onNewGameClick}
            onSettingsClick={this.onSettingsClick} />}
          {status === 'game' && <Game/>}
          {status === 'settings' && <Settings/>}
        </div>
        <div>
        {status !== 'menu' && <button onClick={this.onMainMenuClick}>Menu główne</button>}
        </div>
      </div>
    );
  }
}

export default App;
