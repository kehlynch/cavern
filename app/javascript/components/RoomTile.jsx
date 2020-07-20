import React from 'react';
import { RoomType } from '../types';

class RoomTile extends React.Component {
  constructor(props) {
    super(props);
    const { room: { doors } } = this.props;
    this.state = {
      doors,
    };
  }

  render() {
    const { doors } = this.state;
    return (
      <div>
        <div className="north-exit">{doors.join(',')}</div>
      </div>
    );
  }
}

RoomTile.propTypes = {
  room: RoomType.isRequired,
};

export default RoomTile;
