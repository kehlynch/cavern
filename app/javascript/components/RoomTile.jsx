import React from 'react';
import classNames from 'classnames';
import { RoomType } from '../types';

import styles from '../styles/RoomTile.module.scss';

const RoomTile = (props) => {
  const {
    room: {
      doors, stairsUp, stairsDown, current,
    },
  } = props;
  const tileClasses = classNames(
    styles.container,
    { [styles.unreachable]: doors.length === 0 },
    { [styles.stairsUp]: stairsUp },
    { [styles.stairsDown]: stairsDown },
    { [styles.current]: current },
  );

  if (current) {
    console.log('rendering current roomtile', props.id, tileClasses);
  }
  return (
    <div className={tileClasses}>
      { doors.includes(0) && <div className={styles.north} /> }
      { doors.includes(1) && <div className={styles.east} /> }
      { doors.includes(2) && <div className={styles.south} /> }
      { doors.includes(3) && <div className={styles.west} /> }
    </div>
  );
};

RoomTile.propTypes = {
  room: RoomType.isRequired,
};
export default RoomTile;
