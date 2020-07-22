import React from 'react';
import PropTypes from 'prop-types';

import { createGame } from './helpers/api';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerName: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { setGame } = this.props;
    const { playerName } = this.state;

    createGame({ name: playerName }, setGame);
    event.preventDefault();
  }

  handleNameChange(event) {
    console.log('handleNameChange', event.target.value);
    this.setState({ playerName: event.target.value });
  }

  render() {
    const { playerName } = this.state;
    return (
      <>
        <h1 className="display-4">Welcome to Cavern Delver!</h1>
        <p className="lead">
          What’s your name?
        </p>
        <hr className="my-4" />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="PlayerName">
            <input type="text" value={playerName} onChange={this.handleNameChange} id="playerName" />
          </label>
          <input type="submit" value="Delve the Cavern" />
        </form>
      </>
    );
  }
}

Welcome.propTypes = {
  setGame: PropTypes.func.isRequired,
};

export default Welcome;
