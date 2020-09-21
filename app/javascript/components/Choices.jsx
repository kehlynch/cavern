import React from 'react';
import PropTypes from 'prop-types';

import { makeChoice } from './helpers/api';

import { GameType } from '../types';
import styles from '../styles/Choices.module.scss';

const Choices = (props) => {
  const { choices, setGame } = props;
  return (
    <div className={styles.container}>
      {choices.map((c) => (
        <button onClick={() => makeChoice(c, setGame)} className={styles.button} key={c}>
          {c}
        </button>
      ))}
    </div>
  );
};

Choices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  setGame: PropTypes.func.isRequired,
};

export default Choices;
