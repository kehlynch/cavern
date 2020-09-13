import React from 'react';
import { joinWithAnd } from './helpers/string_utils';

const directions = ['north', 'east', 'south', 'west'];

class Doors extends React.Component {
  doorsText() {
    const { doors } = this.props;
    const words = doors.sort().map((d) => directions[d]);
    return joinWithAnd(words);
  }

  render() {
    return (
      <div>
        <p>There are openings in the rock to your {this.doorsText()}.</p>
      </div>
    );
  }
}
export default Doors;
