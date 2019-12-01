# c5-react-library

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
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { ModalDatePicker, Slider, Switcher } from "c5-react-library";

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

  const handleSwitcherCallback = e => {
    console.log(e);
  };

  const formatDate = date => {
    var testDate = new Date(date),
      month = testDate.getMonth() + 1,
      day = testDate.getDate(),
      year = testDate.getFullYear();

    return month + "/" + day + "/" + year;
  };

  return (
    <div className="container-fluid p-4">
      <div className="text-center w-100 mt-3">
        <h3>c5-react-library kitchen sink</h3>
      </div>
      <hr />
      <div className="text-center my-3">
        <h3>Basic Toggles</h3>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-sm-12 col-md-6 mt-4">
          <Slider />
        </div>
        <div className="col-sm-12 col-md-6 mt-4">
          <Switcher
            label1="Groups"
            label2="Stores"
            changeCallback={handleSwitcherCallback}
            instructions="Here you can put some instructions to help your users"
          />
        </div>
      </div>

      <div className="mt-4">
        <hr />
      </div>
      <h3 className="w-100 text-center">Date Picker</h3>

      <div className="row justify-content-center mt-3">
        <div className="col-sm-12 col-md-6 text-center mt-2">
          <button
            className="btn btn-outline-dark"
            onClick={handleOpenDatePicker}
          >
            Select Date
          </button>
        </div>
        <div className="col-sm-12 col-md-6 text-center mt-2">
          <input type="text" value={formatDate(time)} readOnly={true} />
        </div>
      </div>
      <ModalDatePicker
        value={time}
        isOpen={isOpen}
        onSelect={handleDateSelect}
        onCancel={handleCloseDatePicker}
      />
      <hr />
      <p className="text-center mt-3">
        These are the current widgets that I have designed. More will come soon,
        so keep coming back and checking out the work.
      </p>
    </div>
  );
};

export default App;
```

#Here are some Screenshots of the Components
![Image of the Basics](https://github.com/C5m7b4/c5-react-library/blob/master/github/sample-image-1.png)
Here is a component that I found online, but couldn't get it to work, so I did a little work to it. Here is the orginal link to the component: https://www.npmjs.com/package/react-mobile-datepicker.
At some point, I am going to try and convert this to all function components because some of the lifecycle methods have been deprecated.
![Image of the DatePicker modified](https://github.com/C5m7b4/c5-react-library/blob/master/github/datepicker.png)

## License

MIT © [C5m7b4](https://github.com/C5m7b4)
