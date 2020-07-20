import PropTypes from 'prop-types';

export const DoorType = PropTypes.number;

export const RoomType = PropTypes.shape({
  doors: PropTypes.arrayOf(DoorType).isRequired,
});

export const GameType = PropTypes.shape({
  rooms: PropTypes.arrayOf(RoomType).isRequired,
  currentRoom: RoomType.isRequired,
});
