import React from 'react';
import PropTypes from 'prop-types';

import { ItemType } from '../types';

import { joinWithArticle } from './helpers/string_utils';

const DESCRIPTIONS = {
  silver: 'A small chest of silver',
  gold: 'A small chest of gold',
  gems: 'A small chest of gems',
};

const Item = (props) => {
  const { item } = props;
  const { name, slug } = item;

  const description = DESCRIPTIONS[slug] || name;
  return <div>{description}</div>;
};

Item.propTypes = {
  item: ItemType,
};

export default Item;
