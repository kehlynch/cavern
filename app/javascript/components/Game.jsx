import React from 'react';

import Level from './Level';
import Room from './Room';

import { GameType } from '../types';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { game: { rooms, currentRoom } } = props;
    this.state = {
      rooms,
      room: currentRoom,
    };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(data) {
    console.log('setRoom', data);
    this.setState({ room: data.currentRoom });
  }

  render() {
    const { rooms, room } = this.state;
    console.log('rendering game - current Room', room.id);
    return (
      <div>
        <p>You are in a cavern</p>
        <Room room={room} setRoom={this.setRoom} />
        <Level rooms={rooms} />
      </div>
    );
  }
}

Game.propTypes = {
  game: GameType.isRequired,
};

export default Game;
