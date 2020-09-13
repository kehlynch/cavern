import PropTypes from 'prop-types';

export const DoorType = PropTypes.number;

export const MonsterType = PropTypes.shape({
  id: PropTypes.number,
  slug: PropTypes.string,
  name: PropTypes.string,
  fighting_strength: PropTypes.number,
  magical_power: PropTypes.number,
  hostile: PropTypes.arrayOf(PropTypes.number),
  indifferent: PropTypes.arrayOf(PropTypes.number),
  friendly: PropTypes.arrayOf(PropTypes.number),
  points: PropTypes.number,
  buy_points: PropTypes.number,
  max_load: PropTypes.number,
});

export const ItemType = PropTypes.shape({
  id: PropTypes.number,
  slug: PropTypes.string,
  name: PropTypes.string,
  points: PropTypes.number,
  weight: PropTypes.number,
});

export const RoomType = PropTypes.shape({
  id: PropTypes.number,
  doors: PropTypes.arrayOf(DoorType),
  stairsUp: PropTypes.bool,
  stairsDown: PropTypes.bool,
  current: PropTypes.bool,
  monsters: PropTypes.arrayOf(MonsterType),
});

export const GameType = PropTypes.shape({
  rooms: PropTypes.arrayOf(RoomType).isRequired,
  currentRoom: RoomType.isRequired,
});
