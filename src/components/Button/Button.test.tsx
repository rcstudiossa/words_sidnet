import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { parseToRgb } from "polished";

import theme from "../../theme";
import Button from ".";

describe("Button component", () => {
  it("Should render Button correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button text="Test" />
      </ThemeProvider>,
    );
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("Should have text variant", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Button text="Test" variant="text" />
      </ThemeProvider>,
    );
    const button = getByTestId("button-container");
    const styles = getComputedStyle(button);

    const expectedColor = parseToRgb(theme.colors.primary.dark);
    const expectedRgbColor = `rgb(${expectedColor.red}, ${expectedColor.green}, ${expectedColor.blue})`;

    expect(styles.backgroundColor).toBe("transparent");
    expect(styles.color).toBe(expectedRgbColor);
  });
});
