import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';
import MonsterCard from './MonsterCard';

import { MonsterType } from '../types';
import styles from '../styles/Party.module.scss';

const Party = (props) => {
  const { friends, fight } = props;

  return (
    <div className={styles.container}>
      Your party:
      <CardList>
        {friends.map((m, i) => (
          <MonsterCard
            monster={m}
            key={`party-${m.slug}-${i}`}
            showBuyPoints={false}
            draggable={fight}
          />
        ))}
      </CardList>
    </div>
  );
};

Party.propTypes = {
  friends: PropTypes.arrayOf(MonsterType),
  fight: PropTypes.bool,
};

export default Party;
