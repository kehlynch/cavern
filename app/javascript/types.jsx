import PropTypes from 'prop-types';

export const DoorType = PropTypes.number;

export const MonsterType = PropTypes.shape({
  id: PropTypes.number,
  slug: PropTypes.string,
  name: PropTypes.string,
  fightingStrength: PropTypes.number,
  magicalPower: PropTypes.number,
  hostile: PropTypes.arrayOf(PropTypes.number),
  indifferent: PropTypes.arrayOf(PropTypes.number),
  friendly: PropTypes.arrayOf(PropTypes.number),
  points: PropTypes.number,
  buyPoints: PropTypes.number,
  maxLoad: PropTypes.number,
  hostile: PropTypes.bool,
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
  friends: PropTypes.arrayOf(MonsterType),
  partyPicked: PropTypes.boolean,
  rooms: PropTypes.arrayOf(RoomType).isRequired,
  currentRoom: RoomType.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string),
});

export const MONSTER = 'monster';
