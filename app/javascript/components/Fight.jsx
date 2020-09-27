import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import Battle from './Battle';
import Hoverable from './Hoverable';

import styles from '../styles/Fight.module.scss';

import { MonsterType } from '../types';

class Fight extends React.Component {
  constructor(props) {
    super(props);

    this.addFighter = this.addFighter.bind(this);
    this.removeFighter = this.removeFighter.bind(this);
    this.maybeShowTwoMonsterBattle = this.maybeShowTwoMonsterBattle.bind(this);
    this.maybeHideTwoMonsterBattle = this.maybeHideTwoMonsterBattle.bind(this);

    this.state = this.initializeState(props);
  }

  getBattleId = (monsters) => {
    return monsters
      .map((m) => m.id)
      .sort()
      .join(',');
  };

  initializeState = (props) => {
    const { monsters, friends } = props;

    let battles = monsters.map((m) => ({
      id: this.getBattleId([m]),
      fighters: [],
      monsters: [m],
      visible: false,
    }));
    const twoMonstersAllowed = friends.length <= Math.ceil(monsters.length / 2);
    if (twoMonstersAllowed) {
      const twoMonsterBattles = battles.reduce((acc, battle, index, arr) => {
        const nextBattle = arr[index + 1];
        if (nextBattle) {
          const mergedMonsters = battle.monsters.concat(nextBattle.monsters);
          acc.push({
            id: this.getBattleId(mergedMonsters),
            monsters: mergedMonsters,
            fighters: [],
            visible: true,
          });
        }

        return acc;
      }, []);

      battles = battles.concat(twoMonsterBattles);
    }

    const twoFightersAllowed = monsters.length < friends.length;
    return { battles, twoMonstersAllowed, twoFightersAllowed };
  };

  findBattle(battleId) {
    const { battles } = this.state;
    return battles.find((b) => b.id === battleId);
  }

  maybeHideTwoMonsterBattle(battlesToRestore) {
    if (!battlesToRestore.every((b) => b)) {
      return;
    }
    const { battles } = this.state;

    const mergedId = this.getBattleId(battlesToRestore.map((b) => b.monsters).flat());
    const mergedBattle = this.findBattle(mergedId);
    if (mergedBattle && mergedBattle.fighters.length === 0) {
      this.setState((state) => {
        const newBattles = battles.map((b) => {
          if (b === mergedBattle) {
            return { ...b, visible: false };
          }
          if (battlesToRestore.includes(b)) {
            return { ...b, visible: true };
          }
          return b;
        });
        return {
          ...state,
          battles: newBattles,
        };
      });
    }
  }

  maybeShowTwoMonsterBattle(battleIds) {
    const { twoMonstersAllowed, battles } = this.state;
    if (!twoMonstersAllowed) {
      return;
    }
    const battlesToMerge = battles.filter((b) => battleIds.includes(b.id));
    if (!battlesToMerge.every((b) => b)) {
      return;
    }

    if (battlesToMerge.map((b) => b.fighters).flat().length !== 0) {
      return;
    }

    const mergedMonsters = battlesToMerge.map((b) => b.monsters).flat();
    const mergedBattleId = this.getBattleId(mergedMonsters);
    const mergedBattle = this.findBattle(mergedBattleId);

    this.setState((state) => {
      const newBattles = battles.map((b) => {
        if (b === mergedBattle) {
          return { ...b, visible: true };
        }
        if (battlesToMerge.includes(b)) {
          return { ...b, visible: false };
        }
        return b;
      });
      return {
        ...state,
        battles: newBattles,
      };
    });
  }

  removeFighter(fighter, callback) {
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

  addFighter(fighter, battleId) {
    console.log('addFighter', this.state, battleId);
    this.removeFighter(fighter, () =>
      this.setState((state) => {
        const { battles } = state;
        battles.find((b) => b.id === battleId).fighters.push(fighter);
        return { ...state, battles };
      }),
    );
  }

  render() {
    const { friends } = this.props;
    const { battles, twoFightersAllowed } = this.state;

    console.log('render', this.state);

    const oneMonsterBattles = battles.filter((b) => b.monsters.length === 1);
    const twoMonsterBattles = battles.filter((b) => b.monsters.length === 2);

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
          <div className={styles.twoMonsterBattles}>
            {twoMonsterBattles.map((battle) => {
              return (
                <div className={styles.twoMonsterBattle} key={battle.id}>
                  <Battle
                    {...battle}
                    addFighter={(fighter) => this.addFighter(fighter, battle.id)}
                    twoFightersAllowed={false}
                    visible={battle.visible}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.oneMonsterBattles}>
            {oneMonsterBattles.map((battle, i, array) => {
              return (
                <div className={styles.battle} key={battle.id}>
                  <Battle
                    {...battle}
                    addFighter={(fighter) => this.addFighter(fighter, battle.id)}
                    twoFightersAllowed={twoFightersAllowed}
                    visible={battle.visible}
                  />
                  <div className={styles.hoverZone} />
                  <Hoverable
                    onHover={() => this.maybeShowTwoMonsterBattle([battle.id, array[i + 1]?.id])}
                    onStopHover={() => this.maybeHideTwoMonsterBattle([battle, array[i + 1]])}
                  />
                </div>
              );
            })}
          </div>
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
