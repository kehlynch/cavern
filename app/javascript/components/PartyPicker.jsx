import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';
import CardList from './CardList';
import { pickParty } from './helpers/api';

import { MonsterType } from '../types';
import styles from '../styles/PartyPicker.module.scss';

const BUY_POINTS = 6;

class PartyPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { picked: [] };
    this.startGame = this.startGame.bind(this);
  }

  pick(party) {
    const { setGame } = this.props;
    pickParty(party, setGame);
  }

  addToParty(monster) {
    this.setState((state) => {
      const { picked } = state;
      picked.push(monster);
      return { picked: picked };
    });
  }

  removeFromParty(monster) {
    this.setState((state) => {
      const { picked } = state;
      const firstIndex = picked.findIndex((m) => m.slug == monster.slug);
      if (firstIndex > -1) {
        picked.splice(firstIndex, 1);
      }
      return { picked: picked };
    });
  }

  startGame() {
    const { picked } = this.state;
    const { setGame } = this.props;
    pickParty(picked, setGame);
  }

  renderPickedParty(remainingPoints) {
    const { picked } = this.state;
    return (
      <CardList>
        {!!picked.length &&
          picked
            .sort((a, b) => b.buyPoints - a.buyPoints)
            .map((monster, i) => {
              const { slug } = monster;
              return (
                <MonsterCard
                  monster={monster}
                  onclick={() => this.removeFromParty(monster)}
                  key={`picked-${slug}-${i}`}
                  showBuyPoints={true}
                />
              );
            })}
        {remainingPoints > 0 && <MonsterPlaceholder addMonster={this.addToParty.bind(this)} />}
      </CardList>
    );
  }

  renderPickableParty(remainingPoints) {
    const { pickableParty } = this.props;
    return (
      <CardList>
        {pickableParty
          .sort((a, b) => b.buyPoints - a.buyPoints)
          .map((monster, i) => {
            const { slug } = monster;
            return (
              <MonsterCard
                monster={monster}
                key={`party-select-${slug}-${i}`}
                disabled={remainingPoints < monster.buyPoints}
                showBuyPoints
                draggable
              />
            );
          })}
      </CardList>
    );
  }

  render() {
    const { pickableParty } = this.props;
    const { picked } = this.state;
    console.log('picked', picked);
    const spentPoints = picked.map((m) => m.buyPoints).reduce((p1, p2) => p1 + p2, 0);
    const remainingPoints = BUY_POINTS - spentPoints;
    console.log('partyPIcker', this.props);
    return (
      <div className={styles.container}>
        <h3>Your party</h3>
        {this.renderPickedParty(remainingPoints)}
        <div className={styles.pointsRemaining}>{remainingPoints} points(s) remaining</div>
        {pickableParty && this.renderPickableParty(remainingPoints)}
        {!pickableParty && <div>Waiting</div>}
        <button
          className={classNames(styles.startGame, { [styles.disabled]: remainingPoints > 0 })}
          onClick={this.startGame}
        >
          Start game
        </button>
      </div>
    );
  }
}

PartyPicker.propTypes = {
  pickableParty: PropTypes.arrayOf(MonsterType),
  setGame: PropTypes.func.isRequired,
};

export default PartyPicker;
