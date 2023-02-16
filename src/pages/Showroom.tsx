import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { ChainButton } from "../components/ChainButton";
import { ChainDetails, chains } from "../config/chains";
import { StarknetBlock } from "./StarknetBlock";
import { useStarknet } from "../hooks/useStarknet";
import { EthBlock } from "./EthBlock";
import { FuelBlock } from "./FuelBlock";
import { useFuel } from "../hooks/useFuel";

const chainsArray = Object.values(chains);

export const Showroom = () => {
  const {
    network,
    setNetwork,
    signer,
    connectWallet,
    walletAddress,
    isChangingNetwork,
    isConnecting,
  } = useWeb3Modal();

  const starknet = useStarknet();
  const fuel = useFuel();

  const onChainClick = async (chain: ChainDetails) => {
    setNetwork(chain);

    if ((chain?.type || "eth") === "eth" && !signer) {
      return await connectWallet();
    }

    if (chain?.type === "starknet") {
      return await starknet.connectWallet();
    }

    if (chain?.type === "fuel") {
      return await fuel.connectWallet();
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
      {isChangingNetwork && (network?.type || "eth") === "eth" && signer && (
        <p className="mt-10 mb-0 text-lg font-bold">
          Please change network in MetaMask
        </p>
      )}
      {isConnecting && (network?.type || "eth") === "eth" && (
        <p className="mt-10 mb-0 text-lg font-bold">
          Please sign in to "MetaMask"
        </p>
      )}
      {signer && (network?.type || "eth") === "eth" && !isChangingNetwork && (
        <EthBlock
          network={network!}
          signer={signer}
          walletAddress={walletAddress}
        />
      )}
      {network?.type === "starknet" && (
        <StarknetBlock props={{ ...starknet }} network={network!} />
      )}
      {network?.type === "fuel" && (
        <FuelBlock props={{ ...fuel }} network={network!} />
      )}
    </div>
  );
};
