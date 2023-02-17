import { useState, Dispatch, SetStateAction } from "react";
import { utils, providers, Contract } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { abi } from "../config/ShowroomContractAbi.json";
import { usePricesData } from "./usePricesData";
import { Prices } from "../types";
import axios  from "axios";

export const usePricesFromContract = (
  network: ChainDetails | null,
  signer: providers.JsonRpcSigner | null,
  startMockLoader: () => void,
  setPrices: Dispatch<SetStateAction<Prices>>,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { getPricesTimestamp } = usePricesData();

  const getPricesFromContract = async () => {
    if (network && signer) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.exampleContractAddress;
        if (contractAddress) {
          const prices = await fetchPrices(contractAddress, signer);
          setPrices({
            btc: utils.formatUnits(prices[0], 8),
            eth: utils.formatUnits(prices[1], 8),
            bnb: utils.formatUnits(prices[2], 8),
            ar: utils.formatUnits(prices[3], 8),
            avax: utils.formatUnits(prices[4], 8),
            celo: utils.formatUnits(prices[5], 8),
            canto: prices[6]
          });
          const blockNumber = await signer.provider.getBlockNumber();
          setBlockNumber(blockNumber);
          const timestamp = await getPricesTimestamp();
          setTimestamp(timestamp);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        handleError();
      }
    } else {
      handleError();
    }
  };

  const fetchPrices = async (
    contractAddress: string,
    signer: providers.JsonRpcSigner
  ) => {
    const contract = new Contract(contractAddress, abi, signer);
    const wrappedContract = WrapperBuilder.wrap(contract).usingDataService(
      {
        dataServiceId: "redstone-rapid-demo",
        uniqueSignersCount: 1,
        dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
      },
      ["https://d33trozg86ya9x.cloudfront.net"]
    );

    const canto = axios.get("https://d33trozg86ya9x.cloudfront.net/data-packages/latest?unique-signers-count=1&data-service-id=redstone-main-demo&data-feeds=CANTO");

    let result = await Promise.all( [
        wrappedContract.getPrices(),
      canto
    ]);

    const cantoPrice = result[1].data.CANTO[0].dataPoints[0].value;

    return { ...result[0], 6: cantoPrice }
  };

  const handleError = () => {
    setIsLoading(false);
    setPrices(emptyPrices);
    setIsMockLoading(false);
    setErrorMessage(
      "There was problem with fetching data from smart contract. Please try again or contact RedStone team"
    );
  };

  return {
    blockNumber,
    timestamp,
    isLoading,
    errorMessage,
    setErrorMessage,
    getPricesFromContract,
  };
};
