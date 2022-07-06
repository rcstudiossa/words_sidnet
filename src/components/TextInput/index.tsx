import React, { FC, ReactNode, ChangeEvent } from "react";
import styled from "styled-components";

import Button from "../Button";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = styled.div`
  display: flex;
  flex-direction: row;
  width: 48em;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xsmall};
  align-items: center;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  border: 1px solid ${({ theme }) => theme.colors.grey.g400};
`;

interface InputProps {
  id: any;
  placeholder?: string;
  type?: string;
  onChange?: Function;
}

const Input: FC<InputProps> = styled.input`
  flex: 1;
  color: ${({ theme }) => theme.colors.grey.g100};
  font-size: ${({ theme }) => theme.sizing.large};
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey.g300};
  }
  margin: 0 ${({ theme }) => theme.spacing.small};
`;

interface TextInputProps {
  id: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  buttonColor?: "dark" | "light";
  onChange?: Function;
  onButtonClick?: Function;
}

const TextInput: FC<TextInputProps> = ({ id, placeholder, type, buttonColor, onChange, onButtonClick }) => {
  return (
    <Container>
      <Input id={id} placeholder={placeholder} type={type} onChange={onChange} />
      <Button text="Paste" color={buttonColor} onClick={onButtonClick} />
    </Container>
  );
};

export default TextInput;
