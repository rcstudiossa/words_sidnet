import React, { FC, ReactNode, useEffect } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

import theme from "../../theme";

interface ContainerProps {
  children: ReactNode;
  "data-testid"?: string;
  color: string;
  variant?: string;
  margin?: string;
  onClick?: Function;
}

const Container: FC<ContainerProps> = styled("div")<ContainerProps>`
  display: flex;
  height: ${({ theme }) => theme.sizing.regular};
  background-color: ${({ theme, color }) => theme.colors.primary[`${color}`]};
  color: ${({ theme, color }) => (color === "dark" ? theme.colors.white : theme.colors.primary.dark)};
  margin-left: ${({ theme, margin }) => theme.spacing[`${margin}`]};
  padding: ${({ theme }) => theme.spacing.regular};
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  cursor: pointer;
  ${({ variant }) =>
    variant === "text" &&
    css`
      color: ${({ theme }) => theme.colors.primary.dark};
      background-color: transparent;
      :hover,
      :focus {
        text-decoration: underline;
      }
    `};
  ${({ variant }) =>
    variant === "filled" &&
    css`
      :hover,
      :focus {
        color: ${theme.colors.white};
        background-color: ${darken(0.1, theme.colors.primary.dark)};
      }
    `};

  transition: color 0.2s, background-color 0.2s;
`;

interface TextProps {
  children: ReactNode;
  "data-testid"?: string;
  textColor: string;
}

const Text: FC<TextProps> = styled("p")<TextProps>`
  font-weight: 500;
`;

interface ButtonProps {
  text: string;
  color?: "light" | "dark";
  variant?: "filled" | "text";
  margin?: string;
  onClick?: Function;
}

const Button: FC<ButtonProps> = ({ text, color, variant, margin, onClick }) => {
  let textColor = theme.colors.primary.dark;

  if (!color) {
    color = "dark";
  }
  if (!variant) {
    variant = "filled";
  }

  if (variant === "text") {
    textColor = theme.colors.primary.dark;
  }
  if (color === "dark") {
    textColor = theme.colors.white;
  }

  return (
    <Container
      data-testid="button-container"
      margin={margin}
      color={color}
      variant={variant}
      onClick={onClick}
    >
      <Text data-testid="button-text" textColor={textColor}>
        {text}
      </Text>
    </Container>
  );
};

export default Button;
