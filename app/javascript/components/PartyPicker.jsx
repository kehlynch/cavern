import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';
import CardList from './CardList';
import Picked from './PartyPicker/Picked';
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

  renderPickableParty(remainingPoints) {
    const { pickableParty } = this.props;
    return (
      <>
        <h3>Pick your starting cavern delvers</h3>
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
      </>
    );
  }

  render() {
    const { pickableParty } = this.props;
    const { picked } = this.state;
    const spentPoints = picked.map((m) => m.buyPoints).reduce((p1, p2) => p1 + p2, 0);
    const remainingPoints = BUY_POINTS - spentPoints;
    return (
      <div className={styles.container}>
        <div className={styles.party}>
          <h3>Your party</h3>
          <p className={styles.pointsRemaining}>{remainingPoints} points(s) remaining</p>
          <Picked
            picked={picked}
            remainingPoints={remainingPoints}
            removeFromParty={this.removeFromParty.bind(this)}
            addToParty={this.addToParty.bind(this)}
          />

          <div className={styles.startGameButtonContainer}>
            <button
              className={classNames(styles.startGame, { [styles.disabled]: remainingPoints > 0 })}
              onClick={this.startGame}
            >
              Start game
            </button>
          </div>
        </div>
        <div className={styles.available}>
          {pickableParty && this.renderPickableParty(remainingPoints)}
        </div>
      </div>
    );
  }
}

PartyPicker.propTypes = {
  pickableParty: PropTypes.arrayOf(MonsterType),
  setGame: PropTypes.func.isRequired,
};

export default PartyPicker;
