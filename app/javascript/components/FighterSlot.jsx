import React from 'react';
import PropTypes from 'prop-types';

import MonsterCard from './MonsterCard';
import MonsterPlaceholder from './MonsterPlaceholder';

// import styles from '../styles/FigherSlot.module.scss';

import { MonsterType } from '../types';

class FighterSlot extends React.Component {
  renderPlaceholder() {
    const { addFighter, visible } = this.props;
    return <MonsterPlaceholder onDrop={addFighter} visible={visible} />;
  }

  render() {
    const { fighter } = this.props;
    if (fighter) {
      return <MonsterCard monster={fighter} key={`fighter-${fighter.id}`} draggable />;
    }
    return this.renderPlaceholder();
  }
}

FighterSlot.defaultProps = {
  fighter: null,
  visible: true,
};

FighterSlot.propTypes = {
  fighter: MonsterType,
  addFighter: PropTypes.func,
  visible: PropTypes.bool,
};

export default FighterSlot;
