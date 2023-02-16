import { useState, Dispatch, SetStateAction } from "react";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { usePricesData } from "../chains/evm/usePricesData";
import { Prices } from "../types";
import { DataProvider } from "./DataProvider";
import { ContractAdapter } from "./ContractAdapter";
import { utils } from "ethers";

const DATA_SERVICE_URL = "https://d33trozg86ya9x.cloudfront.net";
const dataPackageRequestParams = {
  dataServiceId: "redstone-rapid-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
};

const dataProvider = new DataProvider(
  DATA_SERVICE_URL,
  dataPackageRequestParams
);

export const useContractPrices = (
  network: ChainDetails | null,
  adapter: ContractAdapter,
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

  const readPricesFromContract = async () => {
    await getPrices(true);
  };

  const getPricesFromPayload = async () => {
    await getPrices(false);
  };

  const getPrices = async (fromContract: boolean) => {
    await performContractAction(async (adapter: ContractAdapter) => {
      const date = new Date().getTime();
      console.log(`START ${new Date().getTime() - date}`);

      const [prices, blockNumber, timestamp] = await Promise.all([
        fromContract
          ? adapter.readPrices(dataProvider)
          : adapter.getPrices(dataProvider),
        adapter.getBlockNumber(network!.rpcUrls[0]),
        fromContract ? adapter.readTimestamp() : getPricesTimestamp(),
      ]);

      handlePrices(setPrices, prices);
      setBlockNumber(blockNumber);
      setTimestamp(timestamp);

      console.log(`END ${new Date().getTime() - date}`);
    });
  };

  const writePricesToContract = async () => {
    setPrices(emptyPrices);
    await performContractAction(async (adapter: ContractAdapter) => {
      const txHashOrPrices = await adapter.writePrices(dataProvider);

      if (typeof txHashOrPrices === "string") {
        setTxHash(txHashOrPrices);
      } else {
        handlePrices(setPrices, txHashOrPrices);
        const [timestamp, blockNumber] = await Promise.all([
          adapter.readTimestamp(),
          adapter.getBlockNumber(network!.rpcUrls[0]),
        ]);

        setBlockNumber(blockNumber);
        setTimestamp(timestamp);
      }
    });
  };

  const performContractAction = async (
    callback: (adapter: ContractAdapter) => void
  ) => {
    if (network) {
      try {
        startMockLoader();
        setIsLoading(true);

        if (adapter) {
          await callback(adapter);
          setIsMockLoading(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        handleError();
        setIsMockLoading(false);
        setIsLoading(false);
      }
    } else {
      handleError();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setPrices(emptyPrices);
    setIsMockLoading(false);
    setErrorMessage(
      "There was problem with fetching data from smart adapter. Please try again or contact RedStone team"
    );
  };

  const handlePrices = (
    setPrices: (value: ((prevState: Prices) => Prices) | Prices) => void,
    prices: number[]
  ) => {
    setPrices({
      btc: utils.formatUnits(prices[0], 8),
      eth: utils.formatUnits(prices[1], 8),
      bnb: utils.formatUnits(prices[2], 8),
      ar: utils.formatUnits(prices[3], 8),
      avax: utils.formatUnits(prices[4], 8),
      celo: utils.formatUnits(prices[5], 8),
    });
  };

  return {
    blockNumber,
    txHash,
    timestamp,
    isLoading,
    errorMessage,
    setErrorMessage,
    getPricesFromPayload,
    readPricesFromContract,
    writePricesToContract,
  };
};
