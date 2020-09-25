import React from 'react';
import PropTypes from 'prop-types';

import { createGame } from './helpers/api';

import Level from './Level';
import Fight from './Fight';
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

  const { monsters } = currentRoom;

  const fighting = monsters.some((m) => m.hostile);

  return (
    <div className={styles.container}>
      {fighting && (
        <div className={styles.fight}>
          <Fight monsters={monsters} friends={friends} />
        </div>
      )}
      {!fighting && (
        <div className={styles.noFight}>
          <div className={styles.party}>
            <p>You are in a cavern</p>
            <Party friends={friends} fight={fighting} />
          </div>
          <div className={styles.room}>
            <Room room={currentRoom} setGame={setGame} />
            <Choices choices={choices} setGame={setGame} />
          </div>
        </div>
      )}
      <div className={styles.level}>
        <div className={styles.newGameButtonContainer}>
          <Level rooms={rooms} />
          <button type="submit" className={styles.newGame} onClick={() => createGame({}, setGame)}>
            New Game
          </button>
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
