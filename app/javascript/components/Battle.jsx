import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import MonsterCard from './MonsterCard';
import FighterSlot from './FighterSlot';

import styles from '../styles/Battle.module.scss';

import { MONSTER, MonsterType } from '../types';

const Battle = (props) => {
  const { fighters, monsters, twoFightersAllowed, addFighter, visible } = props;
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotsToDisplay =
    isOver && fighters.length === 1 && twoFightersAllowed ? 2 : Math.max(1, fighters.length);
  const fightersClasses = classNames(styles.fighters, {
    [styles.doubleWidth]: slotsToDisplay === 2 || monsters.length === 2,
  });

  const containerClasses = classNames(styles.container, {
    [styles.hidden]: !visible,
  });
  return (
    <div ref={drop} className={containerClasses}>
      <div className={fightersClasses}>
        {[...Array(slotsToDisplay)].map((_, i) => (
          <FighterSlot
            fighter={fighters[i]}
            addFighter={addFighter}
            // eslint-disable-next-line react/no-array-index-key
            key={`${fighters[i]?.id || 'placeholder'}-${i}`}
          />
        ))}
      </div>
      <div className={styles.monsters}>
        {monsters.map((monster) => (
          <MonsterCard monster={monster} key={monster.id} />
        ))}
      </div>
    </div>
  );
};

Battle.defaultProps = {
  visible: PropTypes.bool,
};

Battle.propTypes = {
  fighters: PropTypes.arrayOf(MonsterType),
  monsters: PropTypes.arrayOf(MonsterType),
  addFighter: PropTypes.func,
  twoFightersAllowed: PropTypes.bool,
  visible: PropTypes.bool,
  // twoMonstersAllowed: PropTypes.boolean,
};

export default Battle;
