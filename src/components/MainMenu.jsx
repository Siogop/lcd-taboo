import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.newGameClick = this.newGameClick.bind(this);
    this.settingsClick = this.settingsClick.bind(this);
  }

  settingsClick() {
    const { onSettingsClick } = this.props;
    onSettingsClick();
  }

  newGameClick() {
    const { onNewGameClick } = this.props;
    onNewGameClick();
  }

  render() {
    return (
      <div>
        <CustomButton handleClick={this.newGameClick} text="Nowa gra" />
        <CustomButton handleClick={this.settingsClick} text="Ustawienia" />
      </div>
    );
  }
}

MainMenu.propTypes = {
  onSettingsClick: PropTypes.func.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

export default MainMenu;
