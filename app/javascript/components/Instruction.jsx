import React from 'react';
import PropTypes from 'prop-types';
import { updateGame } from './helpers/api';

import { RoomType } from '../types';

const directions = {
  0: { key: 'k', code: 75, word: 'north' },
  1: { key: 'l', code: 76, word: 'east' },
  2: { key: 'j', code: 74, word: 'south' },
  3: { key: 'h', code: 72, word: 'west' },
};

const directionCodes = {
  75: 0,
  76: 1,
  74: 2,
  72: 3,
};

class Instruction extends React.Component {
  componentDidMount() {
    const { room: { doors }, setRoom } = this.props;
    this.move = this.move.bind(this);
    window.addEventListener('keydown', (e) => {
      const dir = directionCodes[e.keyCode];
      this.move(dir);
    });
  }

  move(dir) {
    const { room: { doors }, setRoom } = this.props;
    if (dir !== undefined) {
      if (doors.includes(dir)) {
        updateGame(dir, setRoom);
      } else {
        console.log("can't go that way");
      }
    }
  }

  doorsInstructionText() {
    const { room: { doors } } = this.props;
    const instructions = doors.map((d) => {
      const { key, word } = directions[parseInt(d, 10)];

      return `${key} to go ${word}`;
    });

    if (instructions.length > 1) {
      const lastInstruction = instructions.pop();
      return `press ${instructions.join(', ')} or ${lastInstruction}`;
    }
    return `press ${instructions[0]}`;
  }

  render() {
    return (
      <div>
        { this.doorsInstructionText() }
      </div>
    );
  }
}

Instruction.propTypes = {
  room: RoomType.isRequired,
  setRoom: PropTypes.func.isRequired,
};

export default Instruction;
