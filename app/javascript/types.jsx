import PropTypes from 'prop-types';

export const DoorType = PropTypes.number;

export const RoomType = PropTypes.shape({
  id: PropTypes.number,
  doors: PropTypes.arrayOf(DoorType),
  stairsUp: PropTypes.bool,
  stairsDown: PropTypes.bool,
  current: PropTypes.bool,
});

export const GameType = PropTypes.shape({
  rooms: PropTypes.arrayOf(RoomType).isRequired,
  currentRoom: RoomType.isRequired,
});
