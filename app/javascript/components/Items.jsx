import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import { ItemType } from '../types';

import { joinWithArticle } from './helpers/string_utils';

const Items = (props) => {
  const { items } = props;
  console.log('items props', props);
  return (
    <div>
      There are {items.length} items here:
      {items.map((m, i) => (
        <Item item={m} key={i} />
      ))}
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(ItemType),
};

export default Items;
