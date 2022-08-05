import { useEffect, useState } from "react";

const loaderTexts = [
  "Fetching price data",
  "Sending transaction with fetched price data",
  "Receiving price from smart contract",
];

export const useMockLoader = () => {
  const [isMockLoading, setIsMockLoading] = useState(false);
  const [text, setText] = useState(loaderTexts[0]);

  let textIndex = 1;
  const handleTextChange = () => {
    setTimeout(() => {
      setText(loaderTexts[textIndex]);
      textIndex = textIndex + 1;
      if (textIndex === loaderTexts.length + 1) {
        setIsMockLoading(false);
      } else {
        handleTextChange();
      }
    }, 1000);
  };

  const startMockLoader = () => {
    setIsMockLoading(true);
    handleTextChange();
  };

  return { text, isMockLoading, startMockLoader };
};
