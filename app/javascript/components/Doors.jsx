import React from 'react';

const directions = ['north', 'east', 'south', 'west'];

class Doors extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      doors: props.doors.sort(),
    };
  }

  doorsText() {
    const { doors } = this.state;
    const words = doors.map((d) => directions[d]);

    const lastWord = words.pop();
    return `${words.join(', ')} and ${lastWord}`;
  }

  render() {
    return (
      <div>
        <p>
          There are openings in the rock to your
          { this.doorsText() }
          .
        </p>
      </div>
    );
  }
}
export default Doors;
