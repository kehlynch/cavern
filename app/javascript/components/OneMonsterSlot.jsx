import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import FighterSlot from './FighterSlot';

import styles from '../styles/OneMonsterSlot.module.scss';

import { MONSTER, MonsterType } from '../types';

const OneMonsterSlot = (props) => {
  const { fighters, twoFightersAllowed, addFighter, visible } = props;
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotsToDisplay =
    isOver && fighters.length === 1 && twoFightersAllowed ? 2 : Math.max(1, fighters.length);
  const containerClasses = classNames(styles.container, {
    [styles.doubleWidth]: slotsToDisplay === 2,
    [styles.hidden]: !visible,
  });
  return (
    <div ref={drop} className={containerClasses}>
      {[...Array(slotsToDisplay)].map((_, i) => (
        <FighterSlot
          fighter={fighters[i]}
          addFighter={addFighter}
          // eslint-disable-next-line react/no-array-index-key
          key={`${fighters[i]?.id || 'placeholder'}-${i}`}
        />
      ))}
    </div>
  );
};

OneMonsterSlot.defaultProps = {
  visible: PropTypes.bool,
};

OneMonsterSlot.propTypes = {
  fighters: PropTypes.arrayOf(MonsterType),
  addFighter: PropTypes.func,
  twoFightersAllowed: PropTypes.bool,
  visible: PropTypes.bool,
  // twoMonstersAllowed: PropTypes.boolean,
};

export default OneMonsterSlot;
