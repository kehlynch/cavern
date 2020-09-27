import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import styles from '../styles/Hoverable.module.scss';

import { MONSTER } from '../types';

class HoverableInner extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate HoverableInner', prevProps, this.props);
    const { isOver, onHover, onStopHover } = this.props;
    if (isOver !== prevProps.isOver) {
      if (isOver) {
        console.log('on hover');
        onHover();
      } else {
        console.log('on stop hover');
        onStopHover();
      }
    }
  }

  render() {
    return <div className={styles.container} />;
  }
}

HoverableInner.propTypes = {
  onHover: PropTypes.func,
  onStopHover: PropTypes.func,
  isOver: PropTypes.bool,
};

const Hoverable = (props) => {
  const { onHover, onStopHover } = props;
  console.log('render Hoverable', onHover);
  const [{ isOver }, drop] = useDrop({
    accept: MONSTER,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div ref={drop}>
      <HoverableInner isOver={isOver} onHover={onHover} onStopHover={onStopHover} />
    </div>
  );
};

Hoverable.propTypes = {
  onHover: PropTypes.func,
  onStopHover: PropTypes.func,
};

export default Hoverable;
