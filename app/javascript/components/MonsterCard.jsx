import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandSparkles, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import hero from '../../assets/images/hero.png';

import { MonsterType, MONSTER } from '../types';
import styles from '../styles/MonsterCard.module.scss';

const MonsterCard = (props) => {
  const { monster, onclick, showBuyPoints, disabled, draggable } = props;
  const { slug, name, buyPoints, fightingStrength, magicalPower, maxLoad, friendly } = monster;

  let drag, isDragging;
  if (draggable) {
    [{ isDragging }, drag] = useDrag({
      item: { type: MONSTER, monster: monster },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  }

  const containerClasses = classNames(styles.container, {
    [styles.clickable]: onclick,
    [styles.disabled]: disabled,
    [styles.dragging]: isDragging,
  });

  return (
    <button ref={drag} onClick={onclick} className={containerClasses}>
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
};

MonsterCard.propTypes = {
  monster: MonsterType,
  onclick: PropTypes.func,
  showBuyPoints: PropTypes.bool,
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
};

export default MonsterCard;
