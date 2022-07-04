import React, { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

import logo from "../../assets/thatword-logo-extended.svg";
import Button from "../Button";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: ${({ theme }) => theme.sizes.regular};
  padding: ${({ theme }) => `${theme.sizes.small} ${theme.sizes.xxlarge}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.g500};
`;

const Logo: FC = styled.div`
  flex: 1;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 8em;
`;

const Header: FC = () => {
  return (
    <Container>
      <Logo />
      <Button text="Go Premium" color="light" />
    </Container>
  );
};

export default Header;
