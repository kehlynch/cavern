import React from 'react';
import PropTypes from 'prop-types';

import Doors from './Doors';
import Instruction from './Instruction';

import { RoomType } from '../types';

const Room = (props) => {
  const { room, setRoom } = props;
  const { doors } = room;
  console.log('rendering Room', room.id);
  return (
    <div>
      Room ID
      {' '}
      { room.id }
      <Doors doors={doors} />
      <Instruction room={room} setRoom={setRoom} />
    </div>
  );
};

Room.propTypes = {
  room: RoomType.isRequired,
  setRoom: PropTypes.func.isRequired,
};

export default Room;
