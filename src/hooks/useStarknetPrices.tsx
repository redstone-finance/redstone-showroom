import { useState, Dispatch, SetStateAction } from "react";
import { emptyPrices } from "../utils";
import { ChainDetails } from "../config/chains";
import { usePricesData } from "./usePricesData";
import { Prices } from "../types";
import { StarknetContract } from "./starknet/StarknetContract";
import { IStarknetWindowObject } from "@argent/get-starknet";
import { StarknetDataProvider } from "./starknet/StarknetDataProvider";
import { handlePrices } from "./handle_prices";

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

export const useStarknetPrices = (
  network: ChainDetails | null,
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

  const readPricesFromContract = async () => {
    await getPrices(true);
  };

  const getPricesFromPayload = async () => {
    await getPrices(false);
  };

  const getPrices = async (fromContract: boolean) => {
    await performContractAction(async (contract: StarknetContract) => {
      const prices = fromContract
        ? await contract.readPrices(dataProvider)
        : await contract.getPrices(dataProvider);

      handlePrices(setPrices, prices);

      const blockNumber = await StarknetContract.getBlockNumber(
        network!.rpcUrls[0]
      );

      setBlockNumber(blockNumber);
      const timestamp = fromContract
        ? await contract.readTimestamp()
        : await getPricesTimestamp();
      setTimestamp(timestamp);
    });
  };

  const writePricesToContract = async () => {
    await performContractAction(async (contract: StarknetContract) => {
      const txHash = await contract.writePrices(dataProvider);
      setTxHash(txHash);
    });
  };

  const performContractAction = async (
    callback: (contract: StarknetContract) => void
  ) => {
    if (network && starknet) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.exampleContractAddress;
        if (contractAddress) {
          const contract = new StarknetContract(contractAddress, starknet);

          await callback(contract);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        handleError();
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
    getPricesFromPayload,
    readPricesFromContract,
    writePricesToContract,
  };
};
