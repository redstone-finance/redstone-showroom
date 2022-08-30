import { ChainDetails } from "../config/chains";

interface Props {
  chain: ChainDetails;
  network: ChainDetails | null;
  onChainClick: (chain: ChainDetails) => void;
  disabled: boolean;
}

export const ChainButton = ({
  chain,
  network,
  onChainClick,
  disabled,
}: Props) => (
  <button
    className={`flex align-center gap-2 border py-2 px-2 rounded ${
      chain.chainId === network?.chainId && "border-redstone"
    } disabled:opacity-30`}
    onClick={() => onChainClick(chain)}
    disabled={disabled}
  >
    <img width={24} height={24} src={chain.logo} alt={`${chain.label} logo`} />
    {chain.label}
  </button>
);
