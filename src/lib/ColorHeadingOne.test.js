import React from "react";
import renderer from "react-test-renderer";

import ColorHeadingOne from "./ColorHeadingOne";

describe("ColorHeadingOne", () => {
  it("should exist", () => {
    expect(ColorHeadingOne).toBeTruthy();
  });
  it("should match snapshot", () => {
    const tree = renderer.create(
      <ColorHeadingOne text="Hello" color={"red"} />
    );
    expect(tree).toMatchSnapshot();
  });
});
