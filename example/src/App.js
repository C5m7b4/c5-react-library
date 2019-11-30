import React, { Component } from "react";

import { ColorHeadingOne, ColorHeadingTwo } from "c5-react-library";

export default class App extends Component {
  render() {
    return (
      <div>
        <ColorHeadingOne text="Colored heading one is working" color={"red"} />

        {/* Our other component */}
        <ColorHeadingTwo text="Another Heading" color={"blue"} />
      </div>
    );
  }
}
