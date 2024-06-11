import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { ChainButton } from "../components/ChainButton";
import { ChainDetails, chains } from "../config/chains";
import { CasperBlock } from "./CasperBlock";
import { useCasper } from "../hooks/useCasper";
import { EvmBlock } from "./EvmBlock";
import { useState } from "react";

const chainsArray = Object.values(chains);

export const Showroom = () => {
  const [network, setNetwork] = useState<ChainDetails | null>(null);

  const evm = useWeb3Modal(setNetwork);
  const casper = useCasper();

  const onChainClick = async (chain: ChainDetails) => {
    setNetwork(chain);

    if ((chain?.type || "eth") === "eth") {
      return await evm.connectWallet(chain);
    }

    if (chain?.type === "casper") {
      return await casper.connectWallet();
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
        {chainsArray.map((ch) => (
          <ChainButton
            key={ch.chainId}
            chain={ch}
            network={network}
            onChainClick={onChainClick}
            disabled={false}
          />
        ))}
      </div>

      {(network?.type || "eth") === "eth" && (
        <EvmBlock props={{ ...evm }} network={network!} />
      )}
      {network?.type === "casper" && (
        <CasperBlock props={{ ...casper }} network={network!} />
      )}
    </div>
  );
};
