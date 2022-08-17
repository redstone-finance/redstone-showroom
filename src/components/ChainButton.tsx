import { ChainDetails } from "../config/chains";

interface Props {
  chain: ChainDetails;
  network: ChainDetails | null;
  onChainClick: (chain: ChainDetails) => void;
}

export const ChainButton = ({ chain, network, onChainClick }: Props) => (
  <button
    className={`flex align-center gap-2 border py-2 px-2 rounded ${
      chain.chainId === network?.chainId && "border-redstone"
    }`}
    onClick={() => onChainClick(chain)}
  >
    <img
      width={24}
      height={24}
      src={chain.logo}
      alt={`${chain.chainName} logo`}
    />
    {chain.chainName}
  </button>
);
