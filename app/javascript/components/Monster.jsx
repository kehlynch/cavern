import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { joinWithArticle } from './helpers/string_utils';
import { MonsterType } from '../types';
import styles from '../styles/Monster.module.scss';

const Monster = (props) => {
  const { monster } = props;
  const { name, friendly } = monster;
  const monsterClasses = classNames(styles.container, { [styles.testable]: friendly.length > 0 });
  return <div className={monsterClasses}>A {name}.</div>;
};

Monster.propTypes = {
  monster: MonsterType,
};

export default Monster;
