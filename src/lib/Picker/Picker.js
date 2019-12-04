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
    console.log("useEffect ran for Picker, marginTop=" + marginTop);
    if (viewportRef.current === null) {
      viewportRef.current = document.getElementById("modal-viewport");
    }

    if (scrollRef.current === null) {
      scrollRef.current = document.getElementById("modal-scroll");
    }

    if (isUndefined(viewportRef.current) || viewportRef.current === null)
      return;

    viewportRef.current.addEventListener(
      "touchstart",
      handleContentTouch,
      false
    );
    viewportRef.current.addEventListener(
      "touchmove",
      handleContentTouch,
      false
    );
    viewportRef.current.addEventListener("touchend", handleContentTouch, false);
    viewportRef.current.addEventListener(
      "mousedown",
      handleContentMouseDown,
      false
    );

    draw();

    return function cleanUp() {
      viewportRef.current.removeEventListener("touchstart", handleContentTouch);
      viewportRef.current.removeEventListener("touchmove", handleContentTouch);
      viewportRef.current.removeEventListener("touchend", handleContentTouch);
      viewportRef.current.removeEventListener(
        "mousedown",
        handleContentMouseDown
      );
    };
  }, [store, hide, isShowing]);

  useEffect(() => {
    draw();
  }, [translateY]);

  const clearTransition = obj => {
    addPrefixCss(obj, { transition: "" });
  };

  const moveTo = direction => {
    setAnimating(true);
    //addPrefixCss(scrollRef.current, { transition: "transform .2s ease-out" });

    //localTranslateY = positionsMoved * LINE_HEIGHT + localTranslateY;
    endingYLocation = positionsMoved * LINE_HEIGHT * -1;
    console.log(
      `finalize: positionsMoved: ${positionsMoved}, vertical: ${endingYLocation}, marginTop: ${marginTop}`
    );
    setScrollStyle({
      transform: `translateY(${endingYLocation}px)`,
      marginTop: marginTop
    });

    // there is no transition end so we are going to use setTimeout
    moveToTimer = setTimeout(() => {
      setAnimating(false);
      props.onSelect(store[positionsMoved]);
      clearTransition(scrollRef.current);
      oldTransY = 0;
    }, 200);
  };

  const checkUpdates = (direction, transY) => {
    if (direction === 1) {
      if (transY - oldTransY >= LINE_HEIGHT) {
        oldTransY = transY;
        positionsMoved--;
        console.log("positionsMoved: " + positionsMoved);
      }
    } else {
      console.log("");
      if (transY - oldTransY <= -LINE_HEIGHT) {
        oldTransY = transY;
        positionsMoved++;
        console.log("positionsMoved: " + positionsMoved);
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
    console.log("transY:" + transY + ",endingYLocation: " + endingYLocation);
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

  const handleContentTouch = e => {
    e.preventDefault();
    if (animating) return;
    if (e.type === "touchstart") {
      handleStart(e);
    } else if (e.type === "touchmove") {
      handleMove(e);
    } else if (e.type === "touchend") {
      handleEnd(e);
    }
  };

  const handleContentMouseDown = e => {
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
  };

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
              handleSelect={handleSelect}
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
