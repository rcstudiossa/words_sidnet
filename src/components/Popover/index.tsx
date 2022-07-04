import React, { FC, ReactNode, useEffect, useState, useRef, RefObject } from "react";

import styled, { css } from "styled-components";
import { transparentize } from "polished";

import notFoundIllustration from "../../assets/not_found_illustration.svg";

interface SynonymsPopoverProps {
  children: ReactNode;
  position: number[];
  ref?: RefObject<HTMLDivElement>;
  dataStatus?: string;
}

const Container: FC<SynonymsPopoverProps> = styled("div")<SynonymsPopoverProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: calc(100% - ${({ position }) => position[1]}px);
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  font-size: ${({ theme }) => theme.sizing.large};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0.5em 2em 0 rgba(0, 0, 0, 0.15);
  margin-bottom: ${({ theme }) => theme.spacing.xxsmall};
  padding: ${({ theme }) => theme.spacing.xxxsmall} 0;
  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.white};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey.g400};
    border-radius: 0.5em;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.025);
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.025);
    border: ${({ theme }) => theme.spacing.xxxsmall} solid ${({ theme }) => theme.colors.white};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.grey.g300};
  }
  ${({ dataStatus, position }) =>
    dataStatus === "loaded" &&
    css`
      width: 12em;
      max-height: 12em;
      overflow-y: auto;
      left: calc(${position[0]}px - 6em);
    `}
  ${({ dataStatus, position }) =>
    dataStatus === "loading" &&
    css`
      align-items: center;
      justify-content: center;
      padding: ${({ theme }) => theme.spacing.small};
      left: calc(${position[0]}px - 1.75em);
    `}
    ${({ dataStatus, position }) =>
    dataStatus === "notFound" &&
    css`
      width: 10em;
      left: calc(${position[0]}px - 5em);
    `}
`;

interface SynonymItemProps {
  children: ReactNode;
  onClick?: Function;
}

const SynonymItem: FC<SynonymItemProps> = styled.div`
  flex: 1;
  display: flex;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  margin: 0 ${({ theme }) => theme.spacing.xxxsmall};
  padding: ${({ theme }) => `${theme.spacing.xxsmall} ${theme.spacing.xsmall}`};
  padding-right: 0;
  color: ${({ theme }) => theme.colors.grey.g100};
  cursor: pointer;
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.primary.light};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
  transition: font-weight 0.2s, background-color 0.1s;
`;

const SynonymText: FC<{ children?: ReactNode }> = styled.p`
  flex: 1;
  font-size: ${({ theme }) => theme.sizing.regular};
  white-space: pre-line;
`;

const Loading: FC = styled.div`
  width: ${({ theme }) => theme.sizing.xxlarge};
  height: ${({ theme }) => theme.sizing.xxlarge};
  border: ${({ theme }) => theme.sizing.xxxsmall} solid;
  border-color: ${({ theme }) => transparentize(0.25, theme.colors.primary.main)} transparent;
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NotFoundIllustration: FC = styled.div`
  height: 6em;
  background-image: url(${notFoundIllustration});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-top: ${({ theme }) => theme.spacing.regular};
`;

const NotFoundText: FC<{ children: ReactNode }> = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.sizing.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey.g200};
  margin: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

interface PopoverProps {
  selectedPosition: number[];
  synonyms: string[];
  updateWord?: Function;
  responseCode?: number;
}

const Popover: FC<PopoverProps> = ({ selectedPosition, synonyms, updateWord, responseCode }) => {
  const [show, setShow] = useState(false);
  const [dataStatus, setDataStatus] = useState("notFound");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPosition) {
      setShow(true);
      setDataStatus("loading");
      if (synonyms.length > 0) {
        setDataStatus("loaded");
      } else if (responseCode !== 0) {
        setDataStatus("notFound");
      }
    }
  }, [synonyms]);

  useEffect(() => {
    function handleClickOutside(event: any): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleClick = (synonym: string) => {
    if (updateWord) {
      updateWord(synonym);
      setShow(false);
    }
  };

  if (show) {
    return (
      <Container position={selectedPosition} ref={containerRef} dataStatus={dataStatus}>
        {dataStatus === "loading" ? (
          <Loading />
        ) : dataStatus === "loaded" ? (
          <ul>
            {synonyms.map((synonym) => {
              return (
                <li key={synonym}>
                  <SynonymItem onClick={() => handleClick(synonym)}>
                    <SynonymText>{synonym}</SynonymText>
                  </SynonymItem>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <NotFoundIllustration />
            <NotFoundText>Sorry, we didn't find the synonyms for this one</NotFoundText>
          </>
        )}
      </Container>
    );
  } else {
    return <div />;
  }
};

export default Popover;
