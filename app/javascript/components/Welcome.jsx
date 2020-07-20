import React from 'react';
import PropTypes from 'prop-types';

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

    const url = '/api/v1/games';
    const token = document.querySelector("meta[name='csrf-token']").content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
        'Key-Inflecctin': 'camel',
      },
      body: JSON.stringify({ name: playerName }),
    }).then((response) => {
      console.log('response', response);
      // console.log('response', response.body());
      if (response.ok) {
        return response.json();
      }
      console.log('went wrong!');
      throw new Error('Network response was not ok.');
    })
      .then((data) => setGame(data))
      .catch((error) => {
        console.log('error', error);
        // this.props.history.push('/')
      });
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
