import React from "react";
import ColorHeadingTwo from "./ColorHeadingTwo";
import renderer from "react-test-renderer";

describe("ColorHeadingTwo", () => {
  it("should exist", () => {
    expect(ColorHeadingTwo).toBeTruthy();
  });
  it("should match snapshot", () => {
    const tree = renderer.create(
      <ColorHeadingTwo text="Hello" color={"red"} />
    );
    expect(tree).toMatchSnapshot();
  });
});
