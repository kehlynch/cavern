import React from 'react';
import PropTypes from 'prop-types';
import { RoomType } from '../types';

import RoomTile from './RoomTile';
import styles from '../styles/Level.module.scss';

const Level = (props) => {
  const { rooms } = props;
  return (
    <div className={styles.container}>
      {rooms.map((room) => (
        <RoomTile room={room} key={room.id} />
      ))}
    </div>
  );
};

Level.propTypes = {
  rooms: PropTypes.arrayOf(RoomType).isRequired,
};

export default Level;
