import React from 'react';
import PropTypes from 'prop-types';

import Doors from './Doors';
import Monsters from './Monsters';
import Items from './Items';
import Instruction from './Instruction';

import { RoomType, MonsterType } from '../types';

const Room = (props) => {
  const { room, setGame } = props;
  const { doors, monsters, items } = room;
  console.log('rendering Room', room.id);
  return (
    <div>
      Room ID {room.id}
      <Doors doors={doors} />
      {!!monsters.length && <Monsters monsters={monsters} />}
      {!!items.length && <Items items={items} />}
      <Instruction room={room} setGame={setGame} />
    </div>
  );
};

Room.propTypes = {
  room: RoomType.isRequired,
  setGame: PropTypes.func.isRequired,
};

export default Room;
