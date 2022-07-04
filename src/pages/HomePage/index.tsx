import React, { FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import Header from "../../components/Header";
import Title from "../../components/Title";
import TextInput from "../../components/TextInput";
import Popover from "../../components/Popover";
import Output from "../../components/Output";

const Container: FC<{ children?: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content: FC<{ children?: ReactNode }> = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    if (selectedText) {
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
      setSelectedText(selection.toString());
      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect();
      const { startOffset, endOffset } = selection.getRangeAt(0);
      setRangeToReplace([startOffset, endOffset]);
      setSelectedPosition([x + width / 2, y]);
    }
  };

  const fetchSynonyms = async (word: string) => {
    const { data } = await axios.get(`${BASE_URL}/${word}/synonyms`, {
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
    </Container>
  );
};

export default HomePage;
