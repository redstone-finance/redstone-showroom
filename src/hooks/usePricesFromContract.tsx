import { useState, Dispatch, SetStateAction } from "react";
import { utils, providers, Contract } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { abi } from "../config/ShowroomContractAbi.json";
import { usePricesData } from "./usePricesData";
import { Prices } from "../types";
import { StarknetContract } from "./starknet/StarknetContract";
import { IStarknetWindowObject } from "@argent/get-starknet";
import { StarknetDataProvider } from "./starknet/StarknetDataProvider";

const DATA_SERVICE_URL = "https://d33trozg86ya9x.cloudfront.net";
const dataPackageRequestParams = {
  dataServiceId: "redstone-rapid-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
};

const dataProvider = new StarknetDataProvider(
  DATA_SERVICE_URL,
  dataPackageRequestParams
);

export const usePricesFromContract = (
  network: ChainDetails | null,
  signer: providers.JsonRpcSigner | null,
  starknet: IStarknetWindowObject | undefined,
  startMockLoader: () => void,
  setPrices: Dispatch<SetStateAction<Prices>>,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [txHash, setTxHash] = useState("");
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

  const getStarknetPricesFromPayload = async () => {
    if (network && starknet) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.exampleContractAddress;
        if (contractAddress) {
          const prices = await new StarknetContract(
            contractAddress,
            starknet
          ).getPrices(dataProvider);

          setPrices({
            btc: utils.formatUnits(prices[0], 8),
            eth: utils.formatUnits(prices[1], 8),
            bnb: utils.formatUnits(prices[2], 8),
            ar: utils.formatUnits(prices[3], 8),
            avax: utils.formatUnits(prices[4], 8),
            celo: utils.formatUnits(prices[5], 8),
          });
          const blockNumber = await StarknetContract.getBlockNumber(
            network.rpcUrls[0]
          );

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

  const saveStarknetPricesToContract = async () => {
    if (network && starknet) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.exampleContractAddress;
        if (contractAddress) {
          const blockNumber = await StarknetContract.getBlockNumber(
            network.rpcUrls[0]
          );
          setBlockNumber(blockNumber);
          const txHash = await new StarknetContract(
            contractAddress,
            starknet
          ).writePrices(dataProvider);
          setTxHash(txHash);
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

  const getStarknetPricesFromContract = async () => {
    if (network && starknet) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.exampleContractAddress;
        if (contractAddress) {
          const prices = await new StarknetContract(
            contractAddress,
            starknet
          ).readPrices(dataProvider);

          setPrices({
            btc: utils.formatUnits(prices[0], 8),
            eth: utils.formatUnits(prices[1], 8),
            bnb: utils.formatUnits(prices[2], 8),
            ar: utils.formatUnits(prices[3], 8),
            avax: utils.formatUnits(prices[4], 8),
            celo: utils.formatUnits(prices[5], 8),
          });
          const blockNumber = await StarknetContract.getBlockNumber(
            network.rpcUrls[0]
          );

          setBlockNumber(blockNumber);
          const timestamp = await new StarknetContract(
            contractAddress,
            starknet
          ).readTimestamp();
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
    txHash,
    timestamp,
    isLoading,
    errorMessage,
    setErrorMessage,
    getPricesFromContract,
    getStarknetPricesFromPayload,
    getStarknetPricesFromContract,
    saveStarknetPricesToContract,
  };
};
