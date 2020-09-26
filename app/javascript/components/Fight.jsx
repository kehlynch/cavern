import React from 'react';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import Battle from './Battle';

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
    const battles = monsters.map((m) => ({ fighters: [], monsters: [m] }));
    const twoMonstersAllowed = friends.length <= Math.ceil(monsters.length / 2);
    const twoFightersAllowed = monsters.length < friends.length;
    return { battles, twoMonstersAllowed, twoFightersAllowed };
  };

  removeFighter(fighter, callback) {
    console.log('removeFighter', this.state);
    this.setState(
      (state) => {
        const { battles } = state;
        return {
          ...state,
          battles: battles.map((b) => ({
            ...b,
            fighters: b.fighters.filter((f) => f.id !== fighter.id),
          })),
        };
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  }

  addFighter(fighter, battleIndex) {
    console.log('addFighter', this.state);
    this.removeFighter(fighter, () =>
      this.setState((state) => {
        const { battles } = state;
        battles[battleIndex].fighters.push(fighter);
        return { ...state, battles };
      }),
    );
  }

  render() {
    const { friends } = this.props;
    const { battles, twoFightersAllowed, twoMonstersAllowed } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.friends}>
          {friends.map((friend) => (
            <MonsterCard
              monster={friend}
              key={friend.id}
              onDrag={this.removeFighter}
              used={battles
                .map((b) => b.fighters)
                .flat()
                .includes(friend)}
              draggable
            />
          ))}
        </div>
        <div className={styles.battles}>
          {battles.map((battle, i) => (
            <Battle
              {...battle}
              key={battle.monsters.map((m) => m.id).join(',')}
              addFighter={(fighter) => this.addFighter(fighter, i)}
              twoFightersAllowed={twoFightersAllowed}
              twoMonstersAllowed={twoMonstersAllowed}
            />
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
