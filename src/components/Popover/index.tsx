import React, { FC, ReactNode, useEffect, useState, useRef, RefObject } from "react";

import styled from "styled-components";

interface SynonymsPopoverProps {
  children: ReactNode;
  position: number[];
  ref?: RefObject<HTMLDivElement>;
}

const Container: FC<SynonymsPopoverProps> = styled("div")<SynonymsPopoverProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 12em;
  max-height: 12em;
  overflow-y: auto;
  left: calc(${({ position }) => position[0]}px - 6em);
  bottom: calc(100% - ${({ position }) => position[1]}px);
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  font-size: ${({ theme }) => theme.sizing.large};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.xxsmall};
  padding: ${({ theme }) => theme.spacing.xxxsmall} 0;
  ::-webkit-scrollbar {
    width: 0.9rem !important;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.white};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey.g400};
    border-radius: 0.45em !important;
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.025);
    border: 0.2em solid ${({ theme }) => theme.colors.white};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.grey.g300};
  }
`;

interface SynonymItemProps {
  children: ReactNode;
  onClick?: Function;
}

const SynonymItem: FC<SynonymItemProps> = styled.div`
  flex: 1;
  display: flex;
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  margin: ${({ theme }) => theme.spacing.xxxsmall};
  padding: ${({ theme }) => `${theme.spacing.xxxsmall} ${theme.spacing.xsmall}`};
  cursor: pointer;
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.primary.light};
    font-weight: 700;
  }
`;

const SynonymText: FC<{ children?: ReactNode }> = styled.p`
  flex: 1;
  font-size: ${({ theme }) => theme.sizing.regular};
  color: ${({ theme }) => theme.colors.grey.g100};
  white-space: pre-line;
`;

interface PopoverProps {
  selectedPosition: number[];
  synonyms: string[];
  updateWord?: Function;
}

const Popover: FC<PopoverProps> = ({ selectedPosition, synonyms, updateWord }) => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (synonyms) {
      setShow(true);
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
      <Container position={selectedPosition} ref={containerRef}>
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
      </Container>
    );
  } else {
    return <div />;
  }
};

export default Popover;
