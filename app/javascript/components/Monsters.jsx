import React from 'react';
import PropTypes from 'prop-types';

import { joinWithArticle } from './helpers/string_utils';

import MonsterCard from './MonsterCard';

import styles from '../styles/Monsters.module.scss';

import { MonsterType } from '../types';

const Monsters = (props) => {
  const { monsters } = props;

  const fight = monsters.some((m) => m.hostile);

  return (
    <div className={styles.container}>
      There are {monsters.length} strangers here: {joinWithArticle(monsters.map((m) => m.name))}
      <div className={styles.cardsContainer}>
        {monsters.map((m, i) => (
          <MonsterCard monster={m} key={i} showBuyPoints={false} />
        ))}
      </div>
    </div>
  );
};

Monsters.propTypes = {
  monsters: PropTypes.arrayOf(MonsterType),
};

export default Monsters;
