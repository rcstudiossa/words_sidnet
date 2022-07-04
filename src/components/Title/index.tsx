import React, { FC, ReactNode, useEffect } from "react";

import styled from "styled-components";

const Container: FC<{ children: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: ${({ theme }) => theme.spacing.xxlarge} 0;
`;

const TitleContainer: FC<{ children: ReactNode }> = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TitleProps {
  children: ReactNode;
  underline?: boolean;
}

const TitleText: FC<TitleProps> = styled("p")<TitleProps>`
  font-size: ${({ theme }) => theme.sizes.xxxlarge};
  color: ${({ theme }) => theme.colors.grey.g100};
  font-weight: 700;
  white-space: pre-wrap;
  ${({ underline, theme }) =>
    underline &&
    `
    text-decoration: underline;
    text-decoration-color: ${theme.colors.primary.main};
  `};
`;

const SubtitleText: FC<{ children: ReactNode }> = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.sizes.large};
  color: ${({ theme }) => theme.colors.grey.g200};
  font-weight: 400;
`;

const Title: FC = () => {
  return (
    <Container>
      <TitleContainer>
        <TitleText>Make your </TitleText>
        <TitleText underline>article</TitleText>
        <TitleText> look professional.</TitleText>
      </TitleContainer>
      <SubtitleText>
        Get all those fancy synonyms to transform your boring text into a shakespearean work
      </SubtitleText>
    </Container>
  );
};

export default Title;
