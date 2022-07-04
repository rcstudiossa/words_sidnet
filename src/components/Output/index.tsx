import React, { FC, ReactNode, useEffect, useState } from "react";

import styled from "styled-components";
import { transparentize } from "polished";

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
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
`;

const TextOutput: FC<{ children?: ReactNode }> = styled.p`
  flex: 1;
  display: flex;
  font-size: ${({ theme }) => theme.sizing.large};
  color: ${({ theme }) => theme.colors.grey.g100};
  line-height: 1.25em;
  white-space: pre-line;
`;

interface InfoContainerProps {
  children: ReactNode;
  type: string;
}

const InfoContainer: FC<InfoContainerProps> = styled("div")<InfoContainerProps>`
  flex: 1;
  display: flex;
  padding: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme, type }) => transparentize(0.925, theme.colors.auxiliary[`info`])};
  color: ${({ theme, type }) => transparentize(0.4, theme.colors.auxiliary[`info`])};
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
`;

const InfoText: FC<{ children: ReactNode }> = styled.div`
  flex: 1;
  display: flex;
  font-size: ${({ theme }) => theme.sizing.large};
  font-weight: 500;
  line-height: 1.25em;

  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

interface OutputProps {
  rawText: string;
  getSelection: Function;
}

const Output: FC<OutputProps> = ({ rawText, getSelection }) => {
  const [info, setInfo] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    let tempInfo = { type: "", message: "" };
    if (rawText.length < 2) {
      tempInfo = {
        type: "info",
        message: "Use the field above or click on the button to paste your text.",
      };
    } else if (rawText.length > 512) {
      tempInfo = {
        type: "warning",
        message: "The maximum limit for the free version is 512 characters.",
      };
    } else {
      tempInfo = {
        type: "",
        message: "",
      };
    }

    setInfo(tempInfo);
  }, [, rawText]);

  return (
    <Container onMouseUp={getSelection}>
      {info.message === "" ? (
        <TextOutput>{rawText}</TextOutput>
      ) : (
        <InfoContainer type={info.type}>
          <InfoText>{info.message}</InfoText>
        </InfoContainer>
      )}
    </Container>
  );
};

export default Output;
