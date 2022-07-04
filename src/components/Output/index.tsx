import React, { FC, ReactNode, useEffect, useState } from "react";

import styled, { css } from "styled-components";
import { transparentize } from "polished";

import exampleIllustration from "../../assets/example-illustration.svg";

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
  div:first-child {
    margin-top: 0;
  }
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
  flex-direction: column;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};

  ${({ theme, type }) =>
    type.length > 0 &&
    css`
      padding: ${theme.spacing.xsmall} ${theme.spacing.large};
      color: ${transparentize(0.4, theme.colors.auxiliary[`${type}`])};
      background-color: ${transparentize(0.95, theme.colors.auxiliary[`${type}`])};
    `}
  ${({ theme, type }) =>
    type.length === 0 &&
    css`
      margin-top: ${theme.spacing.xxsmall};
      padding: ${theme.spacing.xxsmall} ${theme.spacing.large};
      border: 1px solid ${theme.colors.grey.g500};
    `}
`;

interface InfoTextProps {
  children: ReactNode;
  type?: string;
}

const InfoText: FC<InfoTextProps> = styled("div")<InfoTextProps>`
  flex: 1;
  display: flex;
  font-size: ${({ theme }) => theme.sizing.large};
  font-weight: 500;
  line-height: 1.25em;
  white-space: pre-line;

  em {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  ${({ theme, type }) =>
    type?.length === 0 &&
    css`
      color: ${theme.colors.grey.g100};
    `}
`;

const ExampleIllustration: FC = styled.div`
  height: 8em;
  background-image: url(${exampleIllustration});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left;
  margin-top: ${({ theme }) => theme.spacing.regular};
`;

interface OutputProps {
  rawText: string;
  getSelection: Function;
}

const Output: FC<OutputProps> = ({ rawText, getSelection }) => {
  const [info, setInfo] = useState({
    type: "info",
    message: "",
  });

  useEffect(() => {
    let tempInfo = { type: "", message: "" };
    if (rawText.length > 512) {
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
      {info.message.length > 0 ? (
        <InfoContainer type={info.type}>
          <InfoText type={info.type}>{info.message}</InfoText>
        </InfoContainer>
      ) : rawText.length > 0 ? (
        <TextOutput>{rawText}</TextOutput>
      ) : (
        <>
          <InfoContainer type={info.type}>
            <InfoText type={info.type}>
              <em>Type</em>&nbsp;or&nbsp;<em>paste your text</em>&nbsp;in the field...
            </InfoText>
          </InfoContainer>
          <InfoContainer type={info.type}>
            <InfoText type={info.type}>
              Just&nbsp;<em>select the words</em>&nbsp;and check which synonym you want to use instead.
            </InfoText>
            <ExampleIllustration />
          </InfoContainer>
        </>
      )}
    </Container>
  );
};

export default Output;
