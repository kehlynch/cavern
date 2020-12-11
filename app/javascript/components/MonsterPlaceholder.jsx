import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import { MONSTER } from '../types';
import styles from '../styles/MonsterPlaceholder.module.scss';

const MonsterPlaceholder = (props) => {
  const { onDrop, dropData, visible } = props;
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    drop: (item) => {
      onDrop(item.monster, dropData);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const classes = classNames(styles.container, {
    [styles.droppable]: isOver,
    [styles.hidden]: !visible,
  });
  return <div ref={drop} className={classes} />;
};

MonsterPlaceholder.defaultProps = {
  dropData: null,
  visible: true,
};

MonsterPlaceholder.propTypes = {
  onDrop: PropTypes.func,
  dropData: PropTypes.shape({}),
  visible: PropTypes.bool,
};

export default MonsterPlaceholder;
