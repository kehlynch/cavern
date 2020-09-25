import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandSparkles, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// import hero from '../../assets/images/hero.png';

import { MonsterType, MONSTER } from '../types';
import styles from '../styles/MonsterCard.module.scss';

const MonsterCard = (props) => {
  const { monster, onclick, showBuyPoints, disabled, draggable, onDrag, dragData, used } = props;
  const { name, buyPoints, fightingStrength, magicalPower, maxLoad } = monster;

  const [{ isDragging }, drag] = useDrag({
    item: { type: MONSTER, monster },
    begin: () => {
      if (onDrag) {
        onDrag(monster, dragData);
      }
    },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const containerClasses = classNames(styles.container, {
    [styles.clickable]: onclick,
    [styles.disabled]: disabled,
    [styles.dragging]: isDragging,
    [styles.used]: used,
  });

  return (
    <button ref={drag} onClick={onclick} className={containerClasses} type="button">
      <div className={styles.name}>{name}</div>
      {showBuyPoints && <div className={styles.buyPoints}>{buyPoints} points</div>}
      <div className={styles.strength}>
        {fightingStrength}
        <FontAwesomeIcon icon={faHandRock} />
      </div>
      {magicalPower && (
        <div className={styles.magic}>
          {magicalPower}
          <FontAwesomeIcon icon={faHandSparkles} />
        </div>
      )}
      {maxLoad && (
        <div className={styles.maxLoad}>
          {maxLoad}
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      )}
    </button>
  );
};

MonsterCard.defaultProps = {
  onclick: null,
  showBuyPoints: false,
  disabled: false,
  draggable: false,
  dragData: null,
  onDrag: null,
  used: false,
};

MonsterCard.propTypes = {
  monster: MonsterType,
  onclick: PropTypes.func,
  showBuyPoints: PropTypes.bool,
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
  dragData: PropTypes.shape({}),
  onDrag: PropTypes.func,
  used: PropTypes.bool,
};

export default MonsterCard;
