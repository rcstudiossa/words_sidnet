import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme";
import Output from ".";

describe("Output component", () => {
  it("Should render Output component correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Output rawText="Lorem ipsum sit dolor amet" getSelection={() => {}} />
      </ThemeProvider>,
    );
    expect(getByText("Lorem ipsum sit dolor amet")).toBeInTheDocument();
  });

  it("Should display warning when 512 characters limit is exceeded", () => {
    const input = "_".repeat(513);
    const { getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Output rawText={input} getSelection={() => {}} />
      </ThemeProvider>,
    );

    expect(getByText("The maximum limit for the free version is 512 characters.")).toBeInTheDocument();
    expect(queryByText(input)).not.toBeInTheDocument();
  });
});
