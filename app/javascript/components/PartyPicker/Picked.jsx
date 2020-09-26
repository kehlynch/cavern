import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MonsterCard from '../MonsterCard';
import MonsterPlaceholder from '../MonsterPlaceholder';
import CardList from '../CardList';
import { pickParty } from '../helpers/api';

import { MonsterType } from '../../types';

const Picked = (props) => {
  const { remainingPoints, picked, removeFromParty, addToParty } = props;
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
                onclick={() => removeFromParty(monster)}
                // eslint-disable-next-line react/no-array-index-key
                key={`picked-${slug}-${i}`}
                showBuyPoints
              />
            );
          })}
      {remainingPoints > 0 && <MonsterPlaceholder addMonster={addToParty} />}
    </CardList>
  );
};

Picked.propTypes = {
  picked: PropTypes.arrayOf(MonsterType),
  addToParty: PropTypes.func.isRequired,
  removeFromParty: PropTypes.func.isRequired,
  remainingPoints: PropTypes.number,
};

export default Picked;
