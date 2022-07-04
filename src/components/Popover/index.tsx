import React, { FC, ReactNode, useEffect, useState } from "react";

import styled from "styled-components";

interface SynonymsPopoverProps {
  children: ReactNode;
  position: number[];
}

const Container: FC<SynonymsPopoverProps> = styled("div")<SynonymsPopoverProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 12em;
  left: calc(${({ position }) => position[0]}px - 6em);
  bottom: calc(100% - ${({ position }) => position[1]}px);
  border-radius: ${({ theme }) => theme.sizes.xxxsmall};
  font-size: ${({ theme }) => theme.sizes.large};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.xxsmall};
  padding: ${({ theme }) => theme.spacing.xxxsmall} 0;
`;

interface SynonymItemProps {
  children: ReactNode;
  onClick?: Function;
}

const SynonymItem: FC<SynonymItemProps> = styled.div`
  flex: 1;
  display: flex;
  border-radius: ${({ theme }) => theme.sizes.xxxsmall};
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
  font-size: ${({ theme }) => theme.sizes.regular};
  color: ${({ theme }) => theme.colors.grey.g100};
  white-space: pre-line;
`;

interface PopoverProps {
  selectedPosition: number[];
  synonyms: string[];
  updateWord?: Function;
}

const Popover: FC<PopoverProps> = ({ selectedPosition, synonyms, updateWord }) => {
  return (
    <Container position={selectedPosition}>
      <ul>
        {synonyms.map((synonym) => {
          return (
            <li key={synonym}>
              <SynonymItem onClick={() => updateWord?.(synonym)}>
                <SynonymText>{synonym}</SynonymText>
              </SynonymItem>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Popover;
