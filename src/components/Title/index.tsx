import React, { FC, ReactNode, useEffect } from "react";

import styled, { css } from "styled-components";

const Container: FC<{ children: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-bottom: ${({ theme }) => theme.spacing.xxlarge};
`;

const TitleContainer: FC<{ children: ReactNode }> = styled.div`
  height: 4em;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

interface TitleProps {
  children: ReactNode;
  underline?: boolean;
}

const TitleText: FC<TitleProps> = styled("p")<TitleProps>`
  font-size: ${({ theme }) => theme.sizing.xxxlarge};
  color: ${({ theme }) => theme.colors.grey.g100};
  font-weight: 700;
  white-space: pre-wrap;
  line-height: 1em;
  ${({ underline, theme }) =>
    underline &&
    css`
      text-decoration: underline;
      text-decoration-color: ${theme.colors.primary.main};
      text-decoration-thickness: 3px;
      text-underline-offset: 0.25rem;
    `};

  @media (maxwidth: "767px") {
    font-size: ${({ theme }) => theme.sizing.xlarge};
  }
`;

const SubtitleText: FC<{ children: ReactNode }> = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.sizing.large};
  color: ${({ theme }) => theme.colors.grey.g200};
  font-weight: 400;
`;

const WordList: FC<{ children: ReactNode }> = styled.ul`
  text-align: left;
  animation-name: change;
  animation-duration: 10s;
  animation-iteration-count: 1;
  -webkit-animation-name: change;
  -webkit-animation-duration: 10s;
  -webkit-animation-iteration-count: 1;

  @keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -3.5em, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -7em, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -10.5em, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -7em, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -3.5em, 0);
    }
  }

  @-webkit-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -3.5em, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -7em, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -10.5em, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -7em, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -3.5em, 0);
    }
  }

  @-o-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -3.5em, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -7em, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -10.5em, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -7em, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -3.5em, 0);
    }
  }

  @-moz-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -3.5em, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -7em, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -10.5em, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -7em, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -3.5em, 0);
    }
  }
`;

const WordListItem: FC<{ children?: ReactNode }> = styled.li``;

const Title: FC = () => {
  const words = ["article", "email", "letter", "text"];
  return (
    <Container>
      <TitleContainer>
        <TitleText>Make your </TitleText>
        <WordList>
          {words.map((word) => {
            return (
              <WordListItem key={word}>
                <TitleText underline>{word}</TitleText>
              </WordListItem>
            );
          })}
        </WordList>
        <TitleText> look professional.</TitleText>
      </TitleContainer>
      <SubtitleText>
        Get all those fancy synonyms to transform your boring text into a shakespearean work
      </SubtitleText>
    </Container>
  );
};

export default Title;
