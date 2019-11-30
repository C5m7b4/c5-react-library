import React, { Component } from "react";
import "./Modal.css";

import { ColorHeadingOne, ColorHeadingTwo, Modal } from "c5-react-library";

export default class App extends Component {
  state = {
    open: false
  };
  toggleState = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };
  render() {
    return (
      <div style={{ width: 800, margin: "15px auto" }}>
        <ColorHeadingOne text="Colored heading one is working" color={"red"} />

        {/* Our other component */}
        <ColorHeadingTwo text="Another Heading" color={"blue"} />

        {/* This is our Modal Component */}
        <button onClick={this.toggleState}>Open Modal</button>
        <Modal
          open={this.state.open}
          onCloseClicked={this.toggleState}
          onBackDropClicked={this.toggleState}
        >
          <div>Im a modal</div>
        </Modal>
      </div>
    );
  }
}
