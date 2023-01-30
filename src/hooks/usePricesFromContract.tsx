import { useState, Dispatch, SetStateAction } from "react";
import { providers, Contract } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { abi } from "../config/ShowroomContractAbi.json";
import { usePricesData } from "./usePricesData";
import { Prices } from "../types";
import { handlePrices } from "./handle_prices";

const DATA_SERVICE_URL = "https://d33trozg86ya9x.cloudfront.net";
const dataPackageRequestParams = {
  dataServiceId: "redstone-rapid-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
};

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
          handlePrices(setPrices, prices);
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
      dataPackageRequestParams,
      [DATA_SERVICE_URL]
    );
    return await wrappedContract.getPrices();
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
