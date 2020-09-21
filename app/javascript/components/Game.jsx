import React from 'react';
import PropTypes from 'prop-types';

import Level from './Level';
import Room from './Room';
import Party from './Party';
import Choices from './Choices';

import { GameType } from '../types';
import styles from '../styles/Game.module.scss';

const Game = (props) => {
  const {
    game: { rooms, currentRoom, friends, choices },
    setGame,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.party}>
        <p>You are in a cavern</p>
        <Party friends={friends} />
      </div>
      <div className={styles.room}>
        <Room room={currentRoom} setGame={setGame} />
        <Choices choices={choices} setGame={setGame} />
      </div>
      <div className={styles.level}>
        <div className={styles.newGameButtonContainer}>
          <button
            type="submit"
            className={styles.newGame}
            onClick={() => createGame({}, this.setGame)}
          >
            New Game
          </button>
          <Level rooms={rooms} />
        </div>
      </div>
    </div>
  );
};

Game.propTypes = {
  game: GameType.isRequired,
  setGame: PropTypes.func.isRequired,
};

export default Game;
