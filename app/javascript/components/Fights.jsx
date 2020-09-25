import React from 'react';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';

import styles from '../styles/Fights.module.scss';

import { MonsterType } from '../types';

class Fights extends React.Component {
  constructor(props) {
    super(props);

    this.addFighter = this.addFighter.bind(this);
    this.removeFighter = this.removeFighter.bind(this);

    this.state = this.initializeState(props);
  }

  initializeState = (props) => {
    const { monsters } = props;
    const monsterCount = monsters.length;
    // const maxFightsWithTwoMonsters = Math.max(0, monsterCount - fightCount);
    // const maxFightsWithTwoFriends = Math.max(0, friendCount - fightCount);

    const fighterSlotsCount = monsterCount * 3 + Math.ceil(monsterCount / 2);

    // const fighterSlots = [...Array(fighterSlotsCount)].map((_, i) => {});

    const slots = {
      even: Array(monsterCount).fill(null),
      twoFriends: Array(monsterCount * 2).fill(null),
      twoMonsters: Array(Math.ceil(monsterCount / 2)).fill(null),
    };

    // const fightsArray = (count, fightType) => {
    //   [...Array(count)].map((_, i) => {
    //     const monsters =
    //       fightType == 'twoMonsters' ? monsters.slice.splice(i * 2, 2) : [monsters[i]];

    //     return {
    //       fightType: fightType,
    //       fightIndex: i,
    //       fighters: [],
    //       monsters: monsters,
    //     };
    //   });
    // };

    // const fights = {
    //   even: fightsArray(monsterCount, 'even'),
    //   twoMonsters: fightsArray(Math.ceil(monsterCount / 2), 'twoMonsters'),
    //   twoFriends: fightsArray(monsterCount, 'twoFriends'),
    // };

    return { slots };
  };

  fightFor(monsterIndex) {
    const { fights, maxFightsWithTwoMonsters, maxFightsWithTwoFriends } = this.state;
    const twoMonsterFight = fights.twoMonsters[Math.floor(monsterIndex / 2)];
    const twoFiendFight = fights.twoFriends[monsterIndex];
    const evenFight = fights.event[monsterIndex];
    return [twoMonsterFight, twoFriendFight].find((f) => f.fighters.length > 0) || evenFight;
  }

  addToFight(fighter, fightNumber) {
    this.setState((state) => {
      const { fights } = state;
      if (!fights[fightNumber]) {
        fights[fightNumber] = { fighters: [] };
      }
      fights = fights.map((fighters) => fighters.filter((f) => f.id != fighter.id));
      fights[fightNumber].fighters.push(friend);
      return { fights };
    });
  }

  removefromFight(fighter, fightNumber) {
    this.setState((state) => {
      const { fights } = state;
      fights[fightNumber].fighters = fights[fightNumber].fighters.filter(
        (f) => f.id !== fighter.id,
      );
      return { fights };
    });
  }

  removeFighter(_fighter, { slotType, slotIndex }) {
    this.setState((state) => {
      const { slots } = state;
      slots[slotType][slotIndex] = null;
      return { slots };
    });
  }

  addFighter(fighter, { slotType, slotIndex }) {
    this.setState((state) => {
      const { slots } = state;
      slots[slotType][slotIndex] = fighter;
      return { slots };
    });
  }

  renderFighter(fighter, i, type) {
    return (
      <MonsterCard
        monster={fighter}
        key={`fighter-${i}`}
        onDrag={this.removeFighter}
        dragData={{ slotType: type, slotIndex: i }}
        draggable
      />
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

  render() {
    //   const { monsters } = this.props;
    //   const { fights } = this.state;
    //   const activeFights = fights.values.flatten.filter((f) => f.fighters.length > 0);
    //   const inactiveFightsToDisplay = monsters
    //     .filter((m) => !activeFights.find((f) => f.monsters.includes(m)))
    //     .map((m) => fights.even.find((f) => f.monsters.includes(m)));

    //   const fightsToDisplay = activeFights.concat(inactiveFightsToDisplay).sort((f) => f.fightIndex);

    //   return (
    //     <div className={styles.container}>
    //       {fightsToDisplay.map((f) => (
    //         <Fight {...f} />
    //       ))}
    //     </div>
    //   );
    // }
    const { monsters } = this.props;
    const { slots } = this.state;

    console.log('slots', slots);
    return (
      <div className={styles.container}>
        <div className={styles.fighters}>
          {slots.even.map((fighter, i) =>
            fighter ? this.renderFighter(fighter, i, 'even') : this.renderPlaceholder(i, 'even'),
          )}
        </div>
        <div className={styles.monsters}>
          {monsters.map((monster, i) => (
            <MonsterCard monster={monster} key={`monster-${i}`} />
          ))}
        </div>
      </div>
    );
  }
}

Fights.propTypes = {
  monsters: PropTypes.arrayOf(MonsterType),
  friendCount: PropTypes.number,
};

export default Fights;
