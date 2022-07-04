import React, { FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import writerIllustration from "../../assets/writer-illustration.svg";
import Header from "../../components/Header";
import Title from "../../components/Title";
import TextInput from "../../components/TextInput";
import Popover from "../../components/Popover";
import Output from "../../components/Output";

interface ContainerProps {
  children: ReactNode;
  onClick?: Function;
}

const Container: FC<ContainerProps> = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content: FC<{ children?: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxlarge};
`;

const Spacer: FC = styled.div`
  flex: 1;
  display: flex;
`;

const Illustration: FC = styled.div`
  position: relative;
  top: -7.1em;
  right: ${({ theme }) => theme.spacing.xxlarge};
  width: 16em;
  height: 12em;
  background-image: url(${writerIllustration});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top right;
`;

const Footer: FC<{ children?: ReactNode }> = styled.div`
  height: 10em;
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.light};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xxlarge};
`;

const HomePage: FC = () => {
  const BASE_URL = "https://wordsapiv1.p.rapidapi.com/words";
  const API_KEY = "7c3a9ce94emsh3e80a46aad536cbp1a1748jsn2e48a87d779c";

  const [displayedText, setDisplayedText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [rangeToReplace, setRangeToReplace] = useState([0, 0]);
  const [synonyms, setSynonyms] = useState([]);

  useEffect(() => {
    if (selectedText.length > 1 && selectedText.split(" ").length === 1 && /[a-zA-Z]/.test(selectedText)) {
      fetchSynonyms(selectedText);
    }
  }, [selectedText]);

  const getTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayedText(event.target.value);
  };

  const getClipboardContent = async () => {
    const clipboardContent = await navigator.clipboard.readText();
    setDisplayedText(clipboardContent);
  };

  const getSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString() !== selectedText) {
      setSelectedText(selection.toString().trim());
      const { startOffset } = selection.getRangeAt(0);
      setRangeToReplace([startOffset, startOffset + selection.toString().trim().length]);
      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect();
      setSelectedPosition([x + width / 2, y]);
    }
  };

  const fetchSynonyms = async (word: string) => {
    const { data } = await axios.get(`${BASE_URL}/${word.toLowerCase()}/synonyms`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
      },
    });
    setSynonyms(data.synonyms);
  };

  const updateWord = (synonym: string) => {
    const newString =
      displayedText.substring(0, rangeToReplace[0]) + synonym + displayedText.substring(rangeToReplace[1]);
    setDisplayedText(newString);
  };

  return (
    <Container>
      <Header />
      <Content>
        <Title />
        <TextInput
          placeholder="Type or paste your text here..."
          onChange={getTextInput}
          onButtonClick={getClipboardContent}
        />
        <Popover selectedPosition={selectedPosition} synonyms={synonyms} updateWord={updateWord} />
        <Output rawText={displayedText} getSelection={getSelection} />
      </Content>
      <Spacer />
      <Footer>
        <Illustration />
      </Footer>
    </Container>
  );
};

export default HomePage;
