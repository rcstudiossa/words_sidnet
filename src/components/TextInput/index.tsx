import React, { FC, ReactNode, ChangeEvent } from "react";
import styled from "styled-components";

import Button from "../Button";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 48em;
  height: ${({ theme }) => theme.sizing.xxlarge};
  background-color: ${({ theme }) => theme.colors.white};
  padding-left: ${({ theme }) => theme.spacing.regular};
  align-items: center;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  border: 1px solid ${({ theme }) => theme.colors.grey.g400};
`;

interface InputProps {
  placeholder?: string;
  type?: string;
  onChange?: Function;
  onButtonClick?: Function;
}

const Input: FC<InputProps> = styled.input`
  flex: 1;
  color: ${({ theme }) => theme.colors.grey.g100};
  font-size: ${({ theme }) => theme.sizing.large};
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey.g300};
  }
`;

const TextInput: FC<InputProps> = ({ placeholder, type, onChange, onButtonClick }) => {
  return (
    <Container>
      <Input placeholder={placeholder} type={type} onChange={onChange} />
      <Button text="Paste" color="dark" margin="xxsmall" onClick={onButtonClick} />
    </Container>
  );
};

export default TextInput;
