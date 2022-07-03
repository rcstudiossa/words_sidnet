import React, { FC, ReactNode, useEffect } from "react";

import styled from "styled-components";
import Header from "../../components/Header";

const Container: FC<{ children?: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content: FC<{ children?: ReactNode }> = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 $large $large $large;
`;

const HomePage: FC = () => {
  return (
    <Container>
      <Header />
      <Content></Content>
    </Container>
  );
};

export default HomePage;
