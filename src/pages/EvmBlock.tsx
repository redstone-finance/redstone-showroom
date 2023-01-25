import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { GetPriceButton } from "../components/GetPriceButton";
import { useMockLoader } from "../hooks/useMockLoader";
import { ChainDetails } from "../config/chains";
import { providers } from "ethers";
import { EvmPricesContractConnector } from "../chains/evm/EvmPricesContractConnector";
import { usePricesContract } from "../hooks/usePricesContract";
import Modal from "../components/Modal";
import { Prices } from "../types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletAddress: string;
    signer: providers.JsonRpcSigner | null;
    isChangingNetwork: boolean;
    isConnecting: boolean;
  };
  network: ChainDetails | null;
}

export const EvmBlock = ({ props, network }: Props) => {
  const {
    signer,
    walletAddress,
    isChangingNetwork,
    isConnecting,
    prices,
    setPrices,
  } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();

  const connector = new EvmPricesContractConnector(
    network?.exampleContractAddress!,
    signer!
  );

  const {
    blockNumber,
    timestamp,
    isLoading,
    getPricesFromPayload,
    errorMessage,
    setErrorMessage,
  } = usePricesContract(
    network,
    connector,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {isConnecting && (network?.type || "eth") === "eth" && (
        <p className="mt-0 mb-10 text-lg font-bold">
          Please sign in to MetaMask
        </p>
      )}
      {isChangingNetwork && signer && (
        <p className="mt-0 mb-10 text-lg font-bold">
          Please change network in MetaMask
        </p>
      )}
      {!isChangingNetwork && network && (
        <ChainDataTable walletAddress={walletAddress} network={network} />
      )}
      {isMockLoading || isLoading ? (
        <GetPriceLoader text={isMockLoading ? text : ""} />
      ) : arePrices ? (
        <PricesTable
          blockNumber={blockNumber}
          timestamp={timestamp}
          prices={prices}
        />
      ) : (
        !isChangingNetwork &&
        network && (
          <GetPriceButton getPriceFromContract={getPricesFromPayload} />
        )
      )}
      {!!errorMessage && (
        <Modal
          closeModal={() => setErrorMessage("")}
          title="Problem with contract interaction"
          text={errorMessage}
        />
      )}
    </div>
  );
};
