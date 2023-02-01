import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesFromContract } from "../hooks/usePricesFromContract";
import Modal from "../components/Modal";
import { ChainButton } from "../components/ChainButton";
import { ChainDetails, chains } from "../config/chains";
import { StarknetBlock } from "./StarknetBlock";
import { useStarknet } from "../hooks/useStarknet";
import { EthBlock } from "./EthBlock";

const chainsArray = Object.values(chains);

export const Showroom = () => {
  const { setIsMockLoading, startMockLoader } = useMockLoader();
  const {
    setPrices,
    network,
    setNetwork,
    signer,
    connectWallet,
    walletAddress,
    isChangingNetwork,
    isConnecting,
  } = useWeb3Modal();
  const { errorMessage, setErrorMessage } = usePricesFromContract(
    network,
    signer,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const starknetProps = useStarknet();
  const onChainClick = async (chain: ChainDetails) => {
    setNetwork(chain);
    if (chain?.isStarknet != true && !signer) {
      return await connectWallet();
    }

    if (chain?.isStarknet == true) {
      return await starknetProps.connectWallet();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {!network && (
        <p className="mb-10 text-lg font-bold">
          Please select a chain-button to integrate your wallet:
        </p>
      )}
      <div className="w-3/5 flex flex-wrap justify-center gap-3 px-10">
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
        <EthBlock
          network={network!}
          signer={signer}
          walletAddress={walletAddress}
        />
      )}
      {network?.isStarknet && (
        <StarknetBlock props={{ ...starknetProps }} network={network!} />
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
