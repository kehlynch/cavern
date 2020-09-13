import React from 'react';
import PropTypes from 'prop-types';

import Level from './Level';
import Room from './Room';

import { GameType } from '../types';

const Game = (props) => {
  const {
    game: { rooms, currentRoom },
    setGame,
  } = props;
  console.log('rendering game - current Room', currentRoom.id);
  return (
    <div>
      <p>You are in a cavern</p>
      <Room room={currentRoom} setGame={setGame} />
      <Level rooms={rooms} />
    </div>
  );
};

Game.propTypes = {
  game: GameType.isRequired,
  setGame: PropTypes.func.isRequired,
};

export default Game;
