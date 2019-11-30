# c5-react-library

[![npm](https://img.shields.io/badge/npm-v0.10.0-orange)](https://www.npmjs.com/package/c5-react-library)
[![NPM](https://img.shields.io/npm/v/c5-react-library.svg)](https://www.npmjs.com/package/c5-react-library)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Simple Library containing toggles, modals, and form components

## Install

```bash
npm install --save c5-react-library
```

## Usage

```jsx
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
          Im a modal
        </Modal>
      </div>
    );
  }
}
```

## License

MIT © [C5m7b4](https://github.com/C5m7b4)
