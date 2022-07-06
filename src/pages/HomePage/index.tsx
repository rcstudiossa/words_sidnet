import React, { FC, ReactNode, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import styled from "styled-components";
import writerIllustration from "../../assets/writer-illustration.svg";
import Header from "../../components/Header";
import Title from "../../components/Title";
import TextInput from "../../components/TextInput";
import Popover from "../../components/Popover";
import Output from "../../components/Output";
import Button from "../../components/Button";

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
  padding-top: ${({ theme }) => theme.spacing.xxlarge};
  overflow-y: auto;
  height: calc(100vh - 3.563em);
  max-height: calc(100vh - 3.563em);

  ::-webkit-scrollbar {
    width: 0.55rem;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.white};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey.g400};
    border-radius: 0.275em;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.025);
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.025);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.grey.g300};
  }
`;

const MainContent: FC<{ children?: ReactNode }> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: ${({ theme }) => theme.spacing.xxlarge};
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
  width: 100%;
  flex: 1;
  height: 8em;
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.light};
  justify-content: flex-end;
  margin-top: 8em;
`;

const HomePage: FC = () => {
  const BASE_URL = "https://wordsapiv1.p.rapidapi.com/words";
  const API_KEY = "7c3a9ce94emsh3e80a46aad536cbp1a1748jsn2e48a87d779c";

  const [inputText, setInputText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [rangeToReplace, setRangeToReplace] = useState([0, 0]);
  const [synonyms, setSynonyms] = useState([]);
  const [responseCode, setResponseCode] = useState(0);

  useEffect(() => {
    if (selectedText.length > 1 && selectedText.split(" ").length === 1 && /[a-zA-Z]/.test(selectedText)) {
      setSynonyms([]);
      setResponseCode(0);
      fetchSynonyms(selectedText);
    }
  }, [selectedText]);

  useEffect(() => {
    setDisplayedText(inputText);
  }, [inputText]);

  const getTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const setTextInputValue = (value: string) => {
    const input = document.getElementById("input-text") as HTMLInputElement;
    input.value = value;
    setInputText(value);
  };

  const pasteClipboardContent = async () => {
    const clipboardContent = await navigator.clipboard.readText();
    setTextInputValue(clipboardContent);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(displayedText);
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
    try {
      const { data, status } = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: `/${word.toLowerCase()}/synonyms`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
        },
      });
      setSynonyms(data.synonyms);
      setResponseCode(status);
    } catch (err) {
      const error = err as AxiosError;
      setSynonyms([]);
      if (error.response?.status) {
        setResponseCode(error.response.status);
      }
    }
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
        <MainContent>
          <TextInput
            id="input-text"
            placeholder="Type or paste your text here..."
            buttonColor={inputText.length > 0 ? "light" : "dark"}
            onChange={getTextInput}
            onButtonClick={pasteClipboardContent}
          />
          <Popover
            selectedPosition={selectedPosition}
            synonyms={synonyms}
            updateWord={updateWord}
            responseCode={responseCode}
          />
          <Output rawText={displayedText} getSelection={getSelection} />
          {displayedText.length > 0 ? (
            <Button
              text="Copy Results"
              variant={inputText !== displayedText ? "filled" : "text"}
              onClick={copyToClipboard}
            />
          ) : (
            <div />
          )}
        </MainContent>
        <Spacer />
        <Footer>
          <Illustration />
        </Footer>
      </Content>
    </Container>
  );
};

export default HomePage;
