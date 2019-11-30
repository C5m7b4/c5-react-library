import React from "react";
import Modal from "./Modal";
import renderer from "react-test-renderer";

describe("Modal", () => {
  it("should exist", () => {
    expect(Modal).toBeTruthy();
  });
  const state = {
    open: true
  };
  it("should render", () => {
    const tree = renderer.create(
      <Modal
        open={state.open}
        onCloseClicked={jest.fn()}
        onBackDropClicked={jest.fn()}
      >
        Im a modal
      </Modal>
    );
    expect(tree).toMatchSnapshot();
  });
});
