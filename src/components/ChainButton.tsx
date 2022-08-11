import { ChainDetails } from "../config/chains";

interface Props {
  chain: ChainDetails;
  onChainClick: (chain: ChainDetails) => void;
}

export const ChainButton = ({ chain, onChainClick }: Props) => (
  <button
    className="flex align-center gap-2 border py-2 px-2 rounded"
    onClick={() => onChainClick(chain)}
  >
    <img width={24} height={24} src={chain.logo} />
    {chain.chainName}
  </button>
);
