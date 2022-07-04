import React, { FC, ReactNode, useEffect, useState } from "react";

import styled from "styled-components";

interface ContainerProps {
  children: ReactNode;
  onMouseUp?: Function;
}

const Container: FC<ContainerProps> = styled.div`
  width: 48em;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.grey.g500};
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
`;

const TextOutput: FC<{ children?: ReactNode }> = styled.p`
  flex: 1;
  display: flex;
  font-size: ${({ theme }) => theme.sizes.large};
  color: ${({ theme }) => theme.colors.grey.g100};
  line-height: 1.25em;
  white-space: pre-line;
`;

interface OutputProps {
  rawText: string;
  getSelection: Function;
}

const Output: FC<OutputProps> = ({ rawText, getSelection }) => {
  return (
    <Container onMouseUp={getSelection}>
      <TextOutput>{rawText}</TextOutput>
    </Container>
  );
};

export default Output;
