import { Dispatch, SetStateAction, useState } from "react";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { usePricesData } from "../chains/evm/usePricesData";
import { Prices } from "../types";
import { utils } from "ethers";
import {
  ContractParamsProvider,
  IContractConnector,
  IPricesContractAdapter,
} from "redstone-sdk";

const dataPackageRequestParams = {
  dataServiceId: "redstone-rapid-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
};

export const usePricesContract = (
  network: ChainDetails | null,
  connector: IContractConnector<IPricesContractAdapter>,
  startMockLoader: () => void,
  setPrices: Dispatch<SetStateAction<Prices>>,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>,
  paramsProviderClass: typeof ContractParamsProvider = ContractParamsProvider
) => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [timestamp, setTimestamp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { getPricesTimestamp } = usePricesData();
  const paramsProvider = new paramsProviderClass(dataPackageRequestParams);

  const readPricesFromContract = async () => {
    await getPrices(true);
  };

  const getPricesFromPayload = async () => {
    await getPrices(false);
  };

  const getPrices = async (fromContract: boolean) => {
    await performContractAction(async (adapter: IPricesContractAdapter) => {
      const date = new Date().getTime();
      console.log(`START ${new Date().getTime() - date}`);

      const [prices, blockNumber, timestamp] = await Promise.all([
        fromContract
          ? adapter.readPricesFromContract(paramsProvider)
          : adapter.getPricesFromPayload(paramsProvider),
        connector.getBlockNumber(network!.rpcUrls[0]),
        fromContract
          ? adapter.readTimestampFromContract()
          : getPricesTimestamp(),
      ]);

      handlePrices(setPrices, prices);
      setBlockNumber(blockNumber);
      setTimestamp(timestamp < 1000000000000 ? timestamp * 1000 : timestamp);

      console.log(`END ${new Date().getTime() - date}`);
    });
  };

  const writePricesToContract = async () => {
    setPrices(emptyPrices);
    await performContractAction(async (adapter: IPricesContractAdapter) => {
      const txHashOrPrices = await adapter.writePricesFromPayloadToContract(
        paramsProvider
      );

      if (typeof txHashOrPrices === "string") {
        setTxHash(txHashOrPrices);
      } else {
        handlePrices(setPrices, txHashOrPrices);
        const [timestamp, blockNumber] = await Promise.all([
          adapter.readTimestampFromContract(),
          connector.getBlockNumber(network!.rpcUrls[0]),
        ]);

        setBlockNumber(blockNumber);
        setTimestamp(timestamp);
      }
    });
  };

  const performContractAction = async (
    callback: (adapter: IPricesContractAdapter) => void
  ) => {
    if (network) {
      try {
        startMockLoader();
        setIsLoading(true);

        const adapter = await connector.getAdapter();

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
