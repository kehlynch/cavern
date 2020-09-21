import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import { MONSTER } from '../types';
import styles from '../styles/MonsterPlaceholder.module.scss';

const MonsterPlaceholder = (props) => {
  const { addMonster } = props;
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    drop: (item) => addMonster(item.monster),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const classes = classNames(styles.container, {
    [styles.droppable]: isOver,
  });
  console.log('isOver', isOver);
  return <div ref={drop} className={classes} />;
};

MonsterPlaceholder.propTypes = {
  addMonster: PropTypes.func,
};

export default MonsterPlaceholder;
