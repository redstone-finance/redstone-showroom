import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesFromContract } from "../hooks/usePricesFromContract";
import Modal from "../components/Modal";
import { ChainButton } from "../components/ChainButton";
import { ChainDetails, chains } from "../config/chains";
import { StarknetShowroom } from "./StarknetShowroom";
import { useStarknet } from "../hooks/useStarknet";
import { EthShowroom } from "./EthShowroom";

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
  const {
    starknet,
    connectWallet: connectStarknetWallet,
    walletAddress: starknetWalletAddress,
  } = useStarknet();
  const { errorMessage, setErrorMessage } = usePricesFromContract(
    network,
    signer,
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
        <EthShowroom
          network={network}
          signer={signer}
          walletAddress={walletAddress}
        />
      )}
      {starknet && network?.isStarknet && (
        <StarknetShowroom
          network={network}
          starknet={starknet}
          walletAddress={starknetWalletAddress}
        />
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
