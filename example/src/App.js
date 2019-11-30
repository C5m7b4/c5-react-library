import React, { Component } from "react";

import {
  ColorHeadingOne,
  ColorHeadingTwo,
  ModalDatePicker
} from "c5-react-library";

export default class App extends Component {
  state = {
    open: false,
    time: new Date(),
    isOpen: false
  };

  toggleState = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleOpenDatePicker = () => {
    this.setState({ isOpen: true });
  };
  handleDateSelect = time => {
    this.setState({ time, isOpen: false });
    console.log(time);
  };

  handleCloseDatePicker = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div style={{ width: 800, margin: "15px auto" }}>
        <ColorHeadingOne text="Colored heading one is working" color={"red"} />

        {/* Our other component */}
        <ColorHeadingTwo text="Another Heading" color={"blue"} />

        {/* This is our Modal Component */}
        <button onClick={this.toggleState}>Open Modal</button>
        <div style={{ marginTop: "30px" }}>
          <button onClick={this.handleOpenDatePicker}>Select Date</button>
          <ModalDatePicker
            value={this.state.time}
            isOpen={this.state.isOpen}
            onSelect={this.handleDateSelect}
            onCancel={this.handleCloseDatePicker}
          />
        </div>
      </div>
    );
  }
}
