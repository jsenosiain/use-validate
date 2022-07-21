import React from "react";
import { render } from "@testing-library/react";

import "jest-canvas-mock";

//import { useValidate } from '../src';

describe("Common render", () => {
  it("renders without crashing", () => {
    render(<>Hello World</>);
  });
});
