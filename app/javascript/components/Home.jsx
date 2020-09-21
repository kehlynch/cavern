import React from 'react';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getGame, getPickableParty, createGame } from './helpers/api';

import Welcome from './Welcome';
import Game from './Game';
import PartyPicker from './PartyPicker';

import styles from '../styles/Home.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.setGame = this.setGame.bind(this);
    this.setPickableParty = this.setPickableParty.bind(this);
    this.state = { game: null };
  }

  componentDidMount() {
    if (Cookies.get('game_id')) {
      getGame(this.setGame);
    }
  }

  setGame(game) {
    console.log('setGame', game);
    this.setState({ game });
    if (!game.partyPicked) {
      getPickableParty(this.setPickableParty);
    }
  }

  setPickableParty(pickableParty) {
    console.log('pickableParty', pickableParty);
    this.setState({ pickableParty });
  }

  render() {
    const { game, pickableParty } = this.state;
    console.log('rendering home, game: ', game);
    return (
      <div className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          {!game && <Welcome setGame={this.setGame} />}
          {game && game.partyPicked && <Game game={game} setGame={this.setGame} />}
          {game && !game.partyPicked && (
            <PartyPicker setGame={this.setGame} pickableParty={pickableParty} />
          )}
        </DndProvider>
      </div>
    );
  }
}

export default Home;
