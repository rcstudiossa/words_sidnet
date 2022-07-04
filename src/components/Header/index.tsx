import React, { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

import logo from "../../assets/thatword-logo-extended.svg";
import Button from "../Button";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.sizing.small} ${theme.sizing.xxlarge}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.g500};
`;

const Logo: FC = styled.div`
  flex: 1;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 8em;
`;

const goToGithub = () => {
  window.open("https://github.com/rcstudiossa/words_sidnet");
};

const Header: FC = () => {
  return (
    <Container>
      <Logo />
      <Button text="Check GitHub" variant="text" onClick={goToGithub} />
      <Button text="Go Premium" color="light" margin="xsmall" />
    </Container>
  );
};

export default Header;
