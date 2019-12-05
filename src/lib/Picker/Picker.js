/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
import React from "react";
import ReactDOM from "react-dom";
import PickerContents from "./PickerContents";
import PropTypes from "prop-types";
import { isUndefined, addPrefixCss } from "../common/utils";

import "./Picker.css";

const Picker = ({
  isShowing,
  hide,
  header,
  store,
  displayField,
  valueField,
  handleSelect,
  useEffect,
  useState,
  useRef,
  ...props
}) => {
  const [animating, setAnimating] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [scrollStyle, setScrollStyle] = useState({});
  const [selectedValue, setSelectedValue] = useState({});
  const [listenersAttached, setListenersAttached] = useState(false);

  const scrollRef = useRef(null);
  const viewportRef = useRef(null);
  let touchY = 0;
  const LINE_HEIGHT = 40;
  let DATA_LENGTH = store.length;
  const MIDDLE_INDEX = Math.floor(DATA_LENGTH / 2);
  const MIDDLE_Y = -LINE_HEIGHT * MIDDLE_INDEX;
  let currentIndex = MIDDLE_INDEX;
  let localTranslateY = 200;
  let marginTop = (currentIndex - MIDDLE_INDEX) * LINE_HEIGHT;
  let moveDateCount = 0;
  let moveToTimer = 0;
  let oldTransY = 0;
  let positionsMoved = 0;
  let endingYLocation = 0;

  useEffect(() => {
    console.log("useEffect called for Picker");

    if (viewportRef.current === null) {
      viewportRef.current = document.getElementById("modal-viewport");
    }

    if (scrollRef.current === null) {
      scrollRef.current = document.getElementById("modal-scroll");
    }

    if (isUndefined(viewportRef.current) || viewportRef.current === null)
      return;

    if (!listenersAttached) {
      viewportRef.current.addEventListener("touchstart", handleContentTouch);
      viewportRef.current.addEventListener("touchmove", handleContentTouch);
      viewportRef.current.addEventListener("touchend", handleContentTouch);
      viewportRef.current.addEventListener("mousedown", handleContentMouseDown);
      setListenersAttached(true);
    }

    draw();

    return function cleanUp() {
      console.log("cleanup running...");
      viewportRef.current.removeEventListener("touchstart", handleContentTouch);
      viewportRef.current.removeEventListener("touchmove", handleContentTouch);
      viewportRef.current.removeEventListener("touchend", handleContentTouch);
      viewportRef.current.removeEventListener(
        "mousedown",
        handleContentMouseDown
      );
      setListenersAttached(false);
      viewportRef.current = null;
      scrollRef.current = null;
    };
  }, [store, hide, isShowing]);

  useEffect(() => {
    draw();
  }, [translateY]);

  const handleSelectPressed = e => {
    setScrollStyle({
      transform: `translateY(0px)`,
      marginTop: marginTop
    });
    setTimeout(() => {
      endingYLocation = 0;
      positionsMoved = 0;
      setTranslateY(0);
      handleSelect(selectedValue);
      hide();
    }, 200);
  };

  const clearTransition = obj => {
    addPrefixCss(obj, { transition: "" });
  };

  const moveTo = direction => {
    setAnimating(true);
    endingYLocation = positionsMoved * LINE_HEIGHT * -1;
    setScrollStyle({
      transform: `translateY(${endingYLocation}px)`,
      marginTop: marginTop
    });

    // there is no transition end so we are going to use setTimeout
    moveToTimer = setTimeout(() => {
      setAnimating(false);
      setSelectedValue(store[positionsMoved]);
      clearTransition(scrollRef.current);
      oldTransY = 0;
    }, 200);
  };

  const checkUpdates = (direction, transY) => {
    if (direction === 1) {
      if (transY - oldTransY >= LINE_HEIGHT) {
        oldTransY = transY;
        positionsMoved--;
      }
    } else {
      if (transY - oldTransY <= -LINE_HEIGHT) {
        oldTransY = transY;
        positionsMoved++;
      }
    }
  };

  const handleStart = e => {
    if (oldTransY === 0) {
      touchY = getLocalTouchY(e);
      setTranslateY(touchY);
    }
  };

  const handleMove = e => {
    // here we are creating a comment just to see if this is working or not;
    const localTouchY = getLocalTouchY(e);
    const dir = localTouchY - touchY;
    const direction = dir < 0 ? -1 : 1;
    const transY = translateY + dir;

    if (checkUpdates(direction, transY)) {
      moveDateCount = direction < 0 ? moveDateCount + 1 : moveDateCount - 1;
    }
    setTranslateY(transY + endingYLocation);
  };

  const getLocalTouchY = e => {
    return !isUndefined(e.targetTouches) && !isUndefined(e.targetTouches[0])
      ? e.targetTouches[0].pageY
      : e.pageY;
  };

  const handleEnd = e => {
    const localTouchY = e.pageY || e.changedTouches[0].pageY;
    const dir = localTouchY - touchY;
    const direction = dir < 0 ? -1 : 1;
    touchY = localTouchY;
    moveTo(direction);
  };

  function handleContentTouch(e) {
    console.log("touchstart");
    e.preventDefault();
    if (animating) return;
    if (e.type === "touchstart") {
      handleStart(e);
    } else if (e.type === "touchmove") {
      handleMove(e);
    } else if (e.type === "touchend") {
      handleEnd(e);
    }
  }

  function handleContentMouseDown(e) {
    if (animating) return;
    handleStart(e);
    viewportRef.current.addEventListener(
      "mousemove",
      handleContentMouseMove,
      false
    );
    viewportRef.current.addEventListener(
      "mouseup",
      handleContentMouseUp,
      false
    );
  }

  const handleContentMouseMove = e => {
    if (animating) return;
    handleMove(e);
  };

  const handleContentMouseUp = e => {
    if (animating) return;
    handleEnd(e);
    viewportRef.current.removeEventListener(
      "mousemove",
      handleContentMouseMove
    );
    viewportRef.current.removeEventListener("mouseup", handleContentMouseUp);
  };

  const draw = () => {
    if (scrollRef.current !== null) {
      setScrollStyle({
        transform: `translateY(${translateY}px)`,
        marginTop: marginTop
      });
    }
  };

  return (
    <div>
      {isShowing
        ? ReactDOM.createPortal(
            <PickerContents
              hide={hide}
              header={header}
              store={store}
              displayField={displayField}
              valueField={valueField}
              handleSelect={handleSelectPressed}
              scrollRef={scrollRef}
              useEffect={useEffect}
              scrollStyle={scrollStyle}
            />,
            document.body
          )
        : null}
    </div>
  );
};

Picker.propTypes = {
  isShowing: PropTypes.bool,
  store: PropTypes.array,
  hide: PropTypes.func,
  handleSelect: PropTypes.func,
  header: PropTypes.string,
  valueField: PropTypes.string,
  displayField: PropTypes.string,
  useEffect: PropTypes.func,
  useState: PropTypes.func,
  useRef: PropTypes.func
};

export default Picker;
