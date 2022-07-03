import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./theme/global";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";

import HomePage from "./pages/HomePage";

const Container: FC<{ children: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
};

export default App;
