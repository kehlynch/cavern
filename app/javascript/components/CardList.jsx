import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/CardList.module.scss';

const CardList = (props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

CardList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default CardList;
