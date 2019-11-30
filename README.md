# c5-react-library

[![npm](https://img.shields.io/badge/npm-v0.10.0-orange)](https://www.npmjs.com/package/c5-react-library)
[![NPM](https://img.shields.io/npm/v/c5-react-library.svg)](https://www.npmjs.com/package/c5-react-library)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Simple Library containing toggles, modals, form components, and an iOS Date Picker component for Web Apps.

## Install

```bash
npm install --save c5-react-library
```

## Usage

```jsx
import React, { useState } from "react";

import {
  ColorHeadingOne,
  ColorHeadingTwo,
  ModalDatePicker
} from "c5-react-library";

const App = () => {
  const [time, setTime] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = time => {
    setTime(time);
    setIsOpen(false);
  };

  const handleCloseDatePicker = () => {
    setIsOpen(false);
  };

  const formatDate = date => {
    var testDate = new Date(date),
      month = testDate.getMonth() + 1,
      day = testDate.getDate(),
      year = testDate.getFullYear();

    return month + "/" + day + "/" + year;
  };

  return (
    <div style={{ width: 800, margin: "15px auto" }}>
      <ColorHeadingOne text="Colored heading one is working" color={"red"} />

      {/* Our other component */}
      <ColorHeadingTwo text="Another Heading" color={"blue"} />

      {/* This is our Modal Component */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={handleOpenDatePicker}>Select Date</button>
        <ModalDatePicker
          value={time}
          isOpen={isOpen}
          onSelect={handleDateSelect}
          onCancel={handleCloseDatePicker}
        />
      </div>
      <div>
        <input
          style={{ marginTop: "20px" }}
          type="text"
          value={formatDate(time)}
        />
      </div>
    </div>
  );
};

export default App;
```

## License

MIT © [C5m7b4](https://github.com/C5m7b4)
