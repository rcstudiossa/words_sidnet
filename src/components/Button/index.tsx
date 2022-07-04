import React, { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";
import { darken } from "polished";

import theme from "../../theme";

interface ContainerProps {
  children: ReactNode;
  bgColor: string;
  margin?: string;
  onClick?: Function;
}

const Container: FC<ContainerProps> = styled("div")<ContainerProps>`
  display: flex;
  height: ${({ theme }) => theme.sizes.regular};
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ theme }) => theme.spacing.regular};
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.sizes.xxxsmall};
  margin: ${({ theme, margin }) => theme.spacing[`${margin}`]};
  cursor: pointer;
  :hover,
  :focus {
    background-color: ${({ bgColor }) => darken(0.1, bgColor)};
  }
  transition: background-color 0.2s;
`;

interface TextProps {
  children: ReactNode;
  textColor: string;
}

const Text: FC<TextProps> = styled("p")<TextProps>`
  color: ${({ textColor }) => textColor};
  font-weight: 500;
`;

interface ButtonProps {
  text: string;
  color?: "light" | "dark";
  margin?: string;
  onClick?: Function;
}

const Button: FC<ButtonProps> = ({ text, color, margin, onClick }) => {
  let textColor = theme.colors.primary.dark;
  let bgColor = theme.colors.primary.light;
  if (color === "dark") {
    textColor = theme.colors.white;
    bgColor = theme.colors.primary.dark;
  }

  let propMargin = "null";
  if (margin) {
    propMargin = margin;
  }

  return (
    <Container margin={propMargin} bgColor={bgColor} onClick={onClick}>
      <Text textColor={textColor}>{text}</Text>
    </Container>
  );
};

export default Button;
