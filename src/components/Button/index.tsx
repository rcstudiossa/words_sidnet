import React, { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

import logo from "../../assets/thatword-logo-extended.svg";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = styled.div`
  display: flex;
  height: ${({ theme }) => theme.sizes.regular};
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: ${({ theme }) => theme.margins.regular};
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.sizes.xxxsmall};
`;

interface TextProps {
  children: ReactNode;
}

const Text: FC<TextProps> = styled.p`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: 500;
`;

const Button: FC<{ text: string }> = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export default Button;
