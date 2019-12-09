import React, { useState, useEffect, useRef } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { readGroups } from "./api/GroupApi";
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
import { getAssignedStores } from "./api/GroupApi";
import { useSpring, animated } from "react-spring";

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

const importedGroups = {
  error: 0,
  success: true,
  groups: [
    { id: 434, group_name: "10-1" },
    { id: 396, group_name: "760" },
    { id: 368, group_name: "Ace" },
    { id: 395, group_name: "Cash Saver" },
    { id: 430, group_name: "Over10" },
    { id: 426, group_name: "OverTen" },
    { id: 439, group_name: "React Group 1" },
    { id: 440, group_name: "React Group 2" },
    { id: 441, group_name: "React Group 3" },
    { id: 442, group_name: "React Group 4" },
    { id: 443, group_name: "React Group 5" },
    { id: 366, group_name: "Test1" },
    { id: 367, group_name: "Test2" }
  ]
};

const App = () => {
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [groups, showGroups] = useState(false);
  const [stores, showStores] = useState(false);
  const { isShowing, toggle } = useModal(useState);
  const [groupList, setGroupList] = useState([]);
  const [assignedStores, setAssignedStores] = useState([]);

  useEffect(() => {
    loadStores();
    // readGroups(
    //   "https://localhost:44310/api/",
    //   "",
    //   response => {
    //     const j = response.data;
    //     if (j.error === 0) {
    //       setGroupList(j.groups);
    //       showGroups(true);
    //       console.log("setGroups called and setShowGroups");
    //     } else {
    //       console.log(j.msg);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }, []);

  const handleOpenDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const loadStores = () => {
    getAssignedStores(
      "https://localhost:44310/api/",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDNW03YjQiLCJqdGkiOiJmNGExZmZlMC0xN2VjLTRkMWUtYmNhNC01MDVlYzAwMDM1ODciLCJleHAiOjE1NzU3MDc4NzgsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzIwIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjAifQ.LPOIhzosHwXi151btvUTpAtIdReNPXGHjA3S9PHt4FM",
      response => {
        const j = response.data;
        if (j.error === 0) {
          setAssignedStores(j.items);
        } else {
          console.log(j.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
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

  const animation = useSpring({
    marginTop: "0px",
    from: { marginTop: "-500px" }
  });

  const handleSliderChange = e => {
    debugger;
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
          <Slider onChanged={handleSliderChange} />
        </div>
        <div className="col-sm-12 col-md-6 mt-4">
          <Switcher
            label1="Groups"
            label2="Stores"
            changeCallback={handleSwitcherCallback}
            instructions="Here you can put some instructions to help your users"
            useState={useState}
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
        <animated.div style={animation}>
          <Picker
            isShowing={groups}
            hide={toggleShowGroups}
            header="groups"
            store={importedGroups}
            displayField="group_Name"
            valueField="id"
            handleSelect={handleSelectGroup}
            useEffect={useEffect}
            useState={useState}
            useRef={useRef}
          />
        </animated.div>
      </div>
      <div className="row justify-content-center">
        <animated.div style={animation}>
          <Picker
            isShowing={stores}
            hide={toggleShowStores}
            header="Stores"
            store={assignedStores}
            displayField="store_Name"
            valueField="storeid"
            handleSelect={handleSelectStore}
            useEffect={useEffect}
            useState={useState}
            useRef={useRef}
          />
        </animated.div>
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
