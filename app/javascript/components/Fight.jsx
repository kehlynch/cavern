import React from 'react';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';

import styles from '../styles/Fight.module.scss';

import { MonsterType } from '../types';

class Fight extends React.Component {
  constructor(props) {
    super(props);

    this.addFighter = this.addFighter.bind(this);
    this.removeFighter = this.removeFighter.bind(this);

    this.state = this.initializeState(props);
  }

  initializeState = (props) => {
    const { monsters, friends } = props;
    const monsterCount = monsters.length;

    const slots = {
      even: Array(monsterCount).fill(null),
      twoFriends: Array(monsterCount * 2).fill(null),
      twoMonsters: Array(Math.ceil(monsterCount / 2)).fill(null),
    };

    return { slots, twoFriendsAllowed: monsters.length < friends.length };
  };

  // removeFighter(_fighter, { slotType, slotIndex }) {
  //   this.setState((state) => {
  //     const { slots } = state;
  //     slots[slotType][slotIndex] = null;
  //     return { slots };
  //   });
  // }

  removeFighter(fighter, callback) {
    console.log('removeFighter', fighter, this.state);
    this.setState(
      (state) => {
        const { slots } = state;
        const removeFrom = (fighters) => fighters.map((f) => (f && f.id !== fighter.id ? f : null));
        return {
          slots: {
            even: removeFrom(slots.even),
            twoFriends: removeFrom(slots.twoFriends),
            twoMonsters: removeFrom(slots.twoMonsters),
          },
        };
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  }

  addFighter(fighter, { slotType, slotIndex }) {
    console.log('addFighter', this.state);
    this.removeFighter(fighter, () =>
      this.setState((state) => {
        const { slots } = state;
        slots[slotType][slotIndex] = fighter;
        return { slots };
      }),
    );
  }

  renderPlaceholder(i, type) {
    return (
      <MonsterPlaceholder
        key={`placeholder-${i}`}
        onDrop={this.addFighter}
        dropData={{ slotType: type, slotIndex: i }}
      />
    );
  }

  renderFighterSlot(fighter, slotType, slotIndex) {
    if (fighter) {
      return <MonsterCard monster={fighter} key={`fighter-${fighter.id}`} draggable />;
    }
    return this.renderPlaceholder(slotIndex, slotType);
  }

  render() {
    const { friends, monsters } = this.props;
    const { slots } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.friends}>
          {friends.map((friend) => (
            <MonsterCard
              monster={friend}
              key={friend.id}
              onDrag={this.removeFighter}
              used={Object.values(slots).flat().includes(friend)}
              draggable
            />
          ))}
        </div>
        <div className={styles.fighters}>
          {slots.even.map((fighter, i) => this.renderFighterSlot(fighter, 'even', i))}
        </div>
        <div className={styles.monsters}>
          {monsters.map((monster) => (
            <MonsterCard monster={monster} key={monster.id} />
          ))}
        </div>
      </div>
    );
  }
}

Fight.propTypes = {
  friends: PropTypes.arrayOf(MonsterType),
  monsters: PropTypes.arrayOf(MonsterType),
};

export default Fight;
