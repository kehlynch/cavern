import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import styles from '../styles/Hoverable.module.scss';

import { MONSTER } from '../types';

class HoverableInner extends React.Component {
  componentDidUpdate(prevProps) {
    const { isOver, onHover, onStopHover } = this.props;
    if (isOver !== prevProps.isOver) {
      if (isOver) {
        onHover();
      } else {
        onStopHover();
      }
    }
  }

  render() {
    const { children } = this.props;
    return <div className={styles.container}>{children}</div>;
  }
}

HoverableInner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onHover: PropTypes.func,
  onStopHover: PropTypes.func,
  isOver: PropTypes.bool,
};

const Hoverable = (props) => {
  const { onHover, onStopHover, children } = props;
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  });
  return (
    <div ref={drop}>
      <HoverableInner
        isOver={isOver}
        onHover={onHover}
        onStopHover={onStopHover}
        styles={styles.inner}
      >
        {children}
      </HoverableInner>
    </div>
  );
};

Hoverable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onHover: PropTypes.func,
  onStopHover: PropTypes.func,
};

export default Hoverable;
