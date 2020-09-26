import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';

import styles from '../styles/Battle.module.scss';

import { MonsterType } from '../types';

class Battle extends React.Component {
  renderPlaceholder(i) {
    const { addFighter } = this.props;
    return <MonsterPlaceholder key={`placeholder-${i}`} onDrop={addFighter} />;
  }

  renderFighterSlot(fighter, battleType, battleIndex) {
    if (fighter) {
      return <MonsterCard monster={fighter} key={`fighter-${fighter.id}`} draggable />;
    }
    return this.renderPlaceholder(battleIndex, battleType);
  }

  render() {
    const { fighters, monsters } = this.props;
    const slotsToDisplay = Math.max(1, fighters.length);
    const containerClasses = classNames(styles.container, {
      // [styles.disabled]: remainingPoints > 0,
    });

    return (
      <div className={containerClasses}>
        {[...Array(slotsToDisplay)].map((_, i) => this.renderFighterSlot(fighters[i]))}
        <div className={styles.monsters}>
          {monsters.map((monster) => (
            <MonsterCard monster={monster} key={monster.id} />
          ))}
        </div>
      </div>
    );
  }
}

Battle.defaultProps = {
  // twoMonsters: false,
};

Battle.propTypes = {
  fighters: PropTypes.arrayOf(MonsterType),
  monsters: PropTypes.arrayOf(MonsterType),
  addFighter: PropTypes.func,
  // twoFightersAllowed: PropTypes.boolean,
  // twoMonstersAllowed: PropTypes.boolean,
};

export default Battle;
