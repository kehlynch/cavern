import React from 'react';
import PropTypes from 'prop-types';

import { joinWithArticle } from './helpers/string_utils';

import Monster from './Monster';

import styles from '../styles/Monsters.module.scss';

import { MonsterType } from '../types';

const Monsters = (props) => {
  const { monsters } = props;

  return (
    <div className={styles.container}>
      There are {monsters.length} strangers here: {joinWithArticle(monsters.map((m) => m.name))}
      {monsters.map((m, i) => (
        <Monster monster={m} key={i} />
      ))}
    </div>
  );
};

Monsters.propTypes = {
  monsters: PropTypes.arrayOf(MonsterType),
};

export default Monsters;
