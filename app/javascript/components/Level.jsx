import React from 'react';
import PropTypes from 'prop-types';
import { RoomType } from '../types';

import RoomTile from './RoomTile';

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: props.rooms,
    };
  }

  render() {
    const { rooms } = this.state;
    return (
      <div>
        <div>
          {rooms.map((room) => (<RoomTile room={room} key={room.id} />))}
        </div>
      </div>
    );
  }
}

Level.propTypes = {
  rooms: PropTypes.arrayOf(RoomType).isRequired,
};

export default Level;
