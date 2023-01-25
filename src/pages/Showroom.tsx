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
import { WritePricesButton } from "../components/WritePricesButton";
import { ChainTx } from "../components/ChainTx";
import { ReadPricesButton } from "../components/ReadPricesButton";

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
    starknet,
    connectWallet,
    connectStarknetWallet,
    walletAddress,
    isChangingNetwork,
    isConnecting,
  } = useWeb3Modal();
  const {
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
  } = usePricesFromContract(
    network,
    signer,
    starknet,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const onChainClick = async (chain: ChainDetails) => {
    setNetwork(chain);
    if (chain?.isStarknet != true && !signer) {
      return await connectWallet();
    }

    if (chain?.isStarknet == true && !starknet) {
      return await connectStarknetWallet();
    }
  };

  const arePrices = Object.values(prices).every((price) => !!price);

  return (
    <div className="flex justify-center items-center flex-col">
      {!network && (
        <p className="mt-10 mb-0 text-lg font-bold">
          Please select a chain to see sample of Redstone Oracle data
        </p>
      )}
      <div className="w-3/4 flex flex-wrap justify-center gap-3 px-10 mt-10">
        {chainsArray.map((chain) => (
          <ChainButton
            key={chain.chainId}
            chain={chain}
            network={network}
            onChainClick={onChainClick}
            disabled={isConnecting}
          />
        ))}
      </div>
      {isChangingNetwork && network?.isStarknet != true && signer && (
        <p className="mt-10 mb-0 text-lg font-bold">
          Please change network in MetaMask
        </p>
      )}
      {isConnecting && (
        <p className="mt-10 mb-0 text-lg font-bold">
          Please sign in to{" "}
          {network?.isStarknet == true ? "Starknet" : "MetaMask"}
        </p>
      )}
      {signer && network?.isStarknet != true && !isChangingNetwork && (
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
      {starknet && network?.isStarknet && !isChangingNetwork && (
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
            [
              network && (
                <div className="flex gap-3">
                  <WritePricesButton
                    writePricesToContract={saveStarknetPricesToContract}
                  />
                  <ReadPricesButton
                    readPricesFromContract={getStarknetPricesFromContract}
                  />
                  <GetPriceButton
                    getPriceFromContract={getStarknetPricesFromPayload}
                  />
                </div>
              ),

              txHash && <ChainTx txHash={txHash} network={network} />,
            ]
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
