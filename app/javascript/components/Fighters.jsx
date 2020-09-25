import React from 'react';
import PropTypes from 'prop-types';

import { joinWithArticle } from './helpers/string_utils';

import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';

import styles from '../styles/Fight.module.scss';

import { MonsterType } from '../types';

class Fight extends React.Component {
  renderFightingSlot(slotIndex) {
    const { fights } = this.state;
    const fights = fighters[slotIndex];
    console.log('fighters', fighters);
    const key = `fighter-${slotIndex}`;

    return (
      <div key={key}>
        {fighter && <MonsterCard monster={fighter} key={`placeholder-${key}`} draggable={true} />}

        {!fighter && (
          <MonsterPlaceholder
            key={key}
            addMonster={this.addFighter.bind(this)}
            removeMonster={this.removeFighter.bind(this)}
            position={slotIndex}
          />
        )}
      </div>
    );
  }

  render() {
    const { fightType, fighters, monsters } = this.props;
    const { fights } = this.state;
    const fightCount = Math.max(monsters.length, friendCount);
    const fightingMonsters = monsters.filter((m) => !m.magical_power);

    const moreFriendsThanMonsters = friends.length > fightingMonsters.length;
    const fightingSlots = moreFriendsThanMonsters
      ? fightingMonsters.length * 2
      : fightingMonsters.length;

    return (
      <div className={styles.container}>
        <div className={styles.fightingSlots}>
          {[...Array(fightingSlots)].map((_, i) => this.renderFightingSlot(i))}
        </div>
        <div className={styles.monsters}>
          {fightingMonsters.map((m, i) => (
            <MonsterCard monster={m} key={`monster-${i}`} showBuyPoints={false} />
          ))}
        </div>
      </div>
    );
  }
}

Fight.propTypes = {
  fightType: PropTypes.string,
  fightIndex: PropTypes.number,
  fighters: PropTypes.arrayOf(MonsterType),
  monsters: PropTypes.arrayOf(MonsterType),
};

export default Fight;
