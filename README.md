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
import React, { useState, useEffect, useRef } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  ModalDatePicker,
  Switcher,
  Slider,
  useModal,
  Modal,
  Picker
} from "c5-react-library";
import "./Modal.css";
import "./Picker.css";

const fakeStores = [
  { id: 1, description: "Store 001" },
  { id: 2, description: "Store 002" },
  { id: 3, description: "Store 003" },
  { id: 4, description: "Store 004" },
  { id: 5, description: "Store 005" },
  { id: 6, description: "Store 006" },
  { id: 7, description: "Store 007" },
  { id: 8, description: "Store 008" },
  { id: 9, description: "Store 009" },
  { id: 10, description: "Store 010" },
  { id: 11, description: "Store 011" },
  { id: 12, description: "Store 012" },
  { id: 13, description: "Store 013" },
  { id: 14, description: "Store 014" },
  { id: 15, description: "Store 015" },
  { id: 16, description: "Store 016" }
];

const fakeGroups = [
  { id: 1, groupname: "My Group 1" },
  { id: 2, groupname: "Ace" },
  { id: 3, groupname: "Saver Group" },
  { id: 4, groupname: "Priceless" },
  { id: 5, groupname: "Group with Really Long Name" },
  { id: 6, groupname: "Gas Stores" },
  { id: 7, groupname: "Crossroads" }
];

const App = () => {
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [groups, showGroups] = useState(false);
  const [stores, showStores] = useState(false);
  const { isShowing, toggle } = useModal(useState);

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
    if (e === true) {
      showStores(true);
    } else {
      showGroups(true);
    }
  };

  const toggleShowGroups = () => {
    showGroups(!groups);
  };

  const toggleShowStores = () => {
    showStores(!stores);
  };

  const handleSelectGroup = g => {
    console.log(g);
    showGroups(false);
  };

  const handleSelectStore = s => {
    console.log(s);
    showStores(false);
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
      <div className="row justify-content-center">
        <button className="button-default" onClick={toggle}>
          Show Modal
        </button>
        <Modal isShowing={isShowing} hide={toggle} header="Heres my header">
          <div>
            <h3>I am a Modal</h3>
          </div>
        </Modal>
      </div>

      <hr />
      <div className="row justify-content-center">
        <button className="btn btn-outline-dark" onClick={toggleShowGroups}>
          Show Store Picker
        </button>
        <Picker
          isShowing={groups}
          hide={toggleShowGroups}
          header="groups"
          store={fakeGroups}
          displayField="groupname"
          valueField="id"
          handleSelect={handleSelectGroup}
          useEffect={useEffect}
          useState={useState}
          useRef={useRef}
        />
      </div>
      <div className="row justify-content-center">
        <Picker
          isShowing={stores}
          hide={toggleShowStores}
          header="Stores"
          store={fakeStores}
          displayField="description"
          valueField="id"
          handleSelect={handleSelectStore}
          useEffect={useEffect}
          useState={useState}
          useRef={useRef}
        />
      </div>
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
![Image of Group Picker](https://github.com/C5m7b4/c5-react-library/blob/master/github/group-picker.png)
![Image of Store Picker](https://github.com/C5m7b4/c5-react-library/blob/master/github/store-picker.png)

## License

MIT © [C5m7b4](https://github.com/C5m7b4)
