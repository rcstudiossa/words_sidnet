import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme";
import Popover from ".";

describe("Popover component", () => {
  it("Should render Popover correctly (success variant)", () => {
    const synonyms = ["Test 01", "Test 02", "Test 03"];
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Popover selectedPosition={[0, 0]} synonyms={synonyms} updateWord={() => {}} responseCode={200} />
      </ThemeProvider>,
    );
    synonyms.forEach((synonym) => {
      expect(getByText(synonym)).toBeInTheDocument();
    });
  });

  it("Should render Popover correctly (fail variant)", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Popover selectedPosition={[0, 0]} synonyms={[]} updateWord={() => {}} responseCode={400} />
      </ThemeProvider>,
    );
    expect(getByText("Sorry, we didn't find the synonyms for this one")).toBeInTheDocument();
  });

  it("Should render Popover correctly (loading variant)", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Popover selectedPosition={[0, 0]} synonyms={[]} updateWord={() => {}} responseCode={0} />
      </ThemeProvider>,
    );
    const popover = getByTestId("popover-loading");
    const styles = getComputedStyle(popover);

    expect(popover).toBeInTheDocument();
    expect(styles.animation).toBe("spin-anim 1.2s linear infinite");
  });
});
