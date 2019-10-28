import React from 'react';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.newGameClick = this.newGameClick.bind(this);
    this.settingsClick = this.settingsClick.bind(this);
  }
  newGameClick() {
    this.props.onNewGameClick();
  }
  settingsClick() {
    this.props.onSettingsClick();
  }
  render () {
    return(
      <div>
        <button onClick={this.newGameClick}>Nowa gra</button>
        <button onClick={this.settingsClick}>Ustawienia</button>
      </div>
    );
  }
}

export default MainMenu;