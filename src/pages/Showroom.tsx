import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesFromContract } from "../hooks/usePricesFromContract";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { GetPriceButton } from "../components/GetPriceButton";
import Modal from "../components/Modal";
import { ChainButton } from "../components/ChainButton";
import { ChainDataTable } from "../components/ChainDataTable";
import { PricesTable } from "../components/PricesTable";
import { ChainDetails, chains } from "../config/chains";

const chainsArray = Object.values(chains);

export const Showroom = () => {
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const {
    prices,
    setPrices,
    network,
    setNetwork,
    signer,
    connectWallet,
    walletAddress,
  } = useWeb3Modal();
  const {
    blockNumber,
    timestamp,
    isLoading,
    errorMessage,
    setErrorMessage,
    getPricesFromContract,
  } = usePricesFromContract(
    network,
    signer,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const onChainClick = async (chain: ChainDetails) => {
    if (!signer) {
      await connectWallet();
    }
    setNetwork(chain);
  };

  const arePrices = Object.values(prices).every((price) => !!price);

  return (
    <div className="flex justify-center items-center flex-col ">
      <div className="w-full flex justify-evenly px-10 mt-10">
        {chainsArray.map((chain) => (
          <ChainButton
            key={chain.chainId}
            chain={chain}
            onChainClick={onChainClick}
          />
        ))}
      </div>
      {!!signer && (
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
              <GetPriceButton getPriceFromContract={getPricesFromContract} />
            )
          )}
        </div>
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
