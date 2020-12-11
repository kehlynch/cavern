import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import OneMonsterSlot from './OneMonsterSlot';
import Hoverable from './Hoverable';
import FighterSlot from './FighterSlot';

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

  initializeState = (props) => {
    const { monsters, friends } = props;

    const oneMonsterBattles = monsters.map((m) => ({
      id: m.id,
      fighters: [],
      monsters: [m],
      visible: true,
    }));

    const twoMonstersAllowed = friends.length <= Math.ceil(monsters.length / 2);

    const twoMonsterBattles = oneMonsterBattles.reduce((acc, battle, index, arr) => {
      const nextBattle = arr[index + 1];
      if (nextBattle) {
        const mergedMonsters = battle.monsters.concat(nextBattle.monsters);
        acc.push({
          id: this.getBattleId(mergedMonsters),
          monsters: mergedMonsters,
          fighters: [],
          visible: false,
        });
      }

      return acc;
    }, []);

    const twoFightersAllowed = monsters.length < friends.length;
    return {
      twoMonsterBattles,
      twoMonstersAllowed,
      twoFightersAllowed,
      battles: oneMonsterBattles.concat(twoMonsterBattles),
    };
  };

  getBattleId = (monsterOrMonsterArray) => {
    if (Array.isArray(monsterOrMonsterArray)) {
      return monsterOrMonsterArray
        .map((m) => m.id)
        .sort()
        .join(',');
    }
    return monsterOrMonsterArray.id;
  };

  findBattle(monsters) {
    const { battles } = this.state;
    const battleId = this.getBattleId(monsters);
    return battles.find((b) => b.id === battleId);
  }

  maybeHideTwoMonsterBattle(monsters) {
    const twoMonsterBattle = this.findBattle(monsters);

    if (twoMonsterBattle.fighters.length !== 0) {
      return;
    }

    const twoMonsterBattleId = this.getBattleId(monsters);
    const oneMonsterBattleIds = monsters.map(this.getBattleId);

    this.setState((state) => {
      const newBattles = state.battles.map((b) => {
        if (oneMonsterBattleIds.includes(b.id)) {
          return { ...b, visible: true };
        }
        if (twoMonsterBattleId === b.id) {
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

  maybeShowTwoMonsterBattle(monsters) {
    console.log('maybeShowTwoMonsterBattle', monsters);
    const { twoMonstersAllowed, battles } = this.state;
    if (!twoMonstersAllowed) {
      return;
    }
    const oneMonsterBattleIds = monsters.map(this.getBattleId);
    const oneMonsterBattles = battles.filter((b) => oneMonsterBattleIds.includes(b.id));

    if (oneMonsterBattles.map((b) => b.fighters).flat().length !== 0) {
      return;
    }

    const twoMonsterBattleId = this.getBattleId(monsters);
    this.setState((state) => {
      const newBattles = state.battles.map((b) => {
        if (oneMonsterBattleIds.includes(b.id)) {
          return { ...b, visible: false };
        }
        if (twoMonsterBattleId === b.id) {
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
    this.removeFighter(fighter, () =>
      this.setState((state) => {
        const { battles } = state;
        battles.find((b) => b.id === battleId).fighters.push(fighter);
        return { ...state, battles };
      }),
    );
  }

  renderFriends() {
    const { friends } = this.props;
    const { battles } = this.state;

    return (
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
    );
  }

  renderTwoMonsterSlot(monsters) {
    console.log('renderTwoMonsterSlot', monsters);
    const battle = this.findBattle(monsters);
    return (
      <Hoverable
        onHover={() => this.maybeShowTwoMonsterBattle(monsters)}
        onStopHover={() => this.maybeHideTwoMonsterBattle(monsters)}
      >
        <FighterSlot
          fighter={battle.fighters[0]}
          addFighter={(fighter) => this.addFighter(fighter, battle.id)}
          visible={battle.visible}
        />
      </Hoverable>
    );
  }

  render() {
    const { monsters } = this.props;
    const { battles, twoFightersAllowed } = this.state;

    const oneMonsterBattles = battles.filter((b) => b.monsters.length === 1);

    return (
      <div className={styles.container}>
        {this.renderFriends()}
        <div className={styles.fightingSlots}>
          {oneMonsterBattles.map((battle, i, array) => {
            return (
              <React.Fragment key={battle.id}>
                <OneMonsterSlot
                  {...battle}
                  addFighter={(fighter) => this.addFighter(fighter, battle.id)}
                  twoFightersAllowed={twoFightersAllowed}
                  visible={battle.visible}
                />
                {array[i + 1] &&
                  this.renderTwoMonsterSlot(battle.monsters.concat(array[i + 1].monsters))}
              </React.Fragment>
            );
          })}
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
