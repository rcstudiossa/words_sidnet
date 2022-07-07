import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme";
import Header from ".";

describe("Header component", () => {
  it("Should render Header correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );
  });
});
