import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Draggable.module.scss';

const Draggable = (props) => {
  const { children, drag } = props;

  return (
    <div ref={drag} className={styles.container}>
      {children}
    </div>
  );
};

Draggable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  drag: PropTypes.func,
};

export default Draggable;
