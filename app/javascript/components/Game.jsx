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
    <div>
      <p>You are in a cavern</p>
      <Party friends={friends} />
      <Room room={currentRoom} setGame={setGame} />
      <Level rooms={rooms} />
      <Choices choices={choices} setGame={setGame} />
    </div>
  );
};

Game.propTypes = {
  game: GameType.isRequired,
  setGame: PropTypes.func.isRequired,
};

export default Game;
