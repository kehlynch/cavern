import React from 'react';
import Welcome from './Welcome';
import Game from './Game';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.setGame = this.setGame.bind(this);
    this.state = { game: null };
  }

  setGame(game) {
    console.log('setGame', game);
    this.setState({ game });
  }

  render() {
    const { game } = this.state;
    console.log('rendering home, game: ', game);
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            {game ? <Game game={game} /> : <Welcome setGame={this.setGame} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
