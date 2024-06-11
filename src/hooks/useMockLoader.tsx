import { useState } from "react";
import { timeout } from "../utils";

const loaderTexts = [
  "Fetching price data",
  "Sending transaction with fetched price data",
  "Receiving data from smart contract (it may take up to 1 minute)",
];

export const useMockLoader = () => {
  const [isMockLoading, setIsMockLoading] = useState(false);
  const [text, setText] = useState(loaderTexts[0]);

  const handleTextChange = async () => {
    for (const text of loaderTexts) {
      setText(text);
      await timeout(500);
    }
  };

  const startMockLoader = () => {
    setIsMockLoading(true);
    handleTextChange();
  };

  return { text, isMockLoading, setIsMockLoading, startMockLoader };
};
