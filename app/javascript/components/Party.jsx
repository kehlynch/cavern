import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';
import MonsterCard from './MonsterCard';

import { MonsterType } from '../types';
import styles from '../styles/Party.module.scss';

const Party = (props) => {
  const { friends } = props;

  return (
    <div className={styles.container}>
      Your party:
      <CardList>
        {friends.map((m) => (
          <MonsterCard monster={m} key={`party-${m.id}`} showBuyPoints={false} />
        ))}
      </CardList>
    </div>
  );
};

Party.propTypes = {
  friends: PropTypes.arrayOf(MonsterType),
};

export default Party;
