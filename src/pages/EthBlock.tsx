import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { GetPriceButton } from "../components/GetPriceButton";
import { useMockLoader } from "../hooks/useMockLoader";
import { ChainDetails } from "../config/chains";
import { providers } from "ethers";
import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { EthAdapter } from "../chains/evm/EthAdapter";
import { useContractPrices } from "../hooks/useContractPrices";
import Modal from "../components/Modal";

interface Props {
  network: ChainDetails;
  signer: providers.JsonRpcSigner | null;
  walletAddress: string;
}

export const EthBlock = ({ network, signer, walletAddress }: Props) => {
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const { prices, setPrices } = useWeb3Modal();

  const adapter = new EthAdapter(network?.exampleContractAddress!, signer!);

  const {
    blockNumber,
    timestamp,
    isLoading,
    getPricesFromPayload,
    errorMessage,
    setErrorMessage,
  } = useContractPrices(
    network,
    adapter,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {network && (
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
