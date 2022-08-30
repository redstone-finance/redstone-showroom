import { utils } from "ethers";
import PolygonLogo from "../assets/chains/polygon.png";
import EthereumLogo from "../assets/chains/ethereum.png";
import EvmosLogo from "../assets/chains/evmos.png";
import OptimismLogo from "../assets/chains/optimism.png";
import ArbitrumLogo from "../assets/chains/arbitrum.png";
import AvalancheLogo from "../assets/chains/avalanche.png";

export type Chains = { [chainId in number]: ChainDetails };

export interface ChainDetails {
  chainId: string;
  rpcUrls: string[];
  chainName: string;
  label: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
  exampleContractAddress: string;
  contractExplorerUrl: string;
  logo?: any;
}

export const chains: Chains = {
  [9001]: {
    chainId: utils.hexValue(9001),
    rpcUrls: ["https://eth.bd.evmos.org:8545"],
    chainName: "Evmos Mainnet",
    label: "Evmos",
    nativeCurrency: {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
    },
    blockExplorerUrls: ["https://evm.evmos.org"],
    exampleContractAddress: "0x6FbfA613835bEDF60a089eC080e01489C85FafbE",
    contractExplorerUrl:
      "https://evm.evmos.org/address/0x6FbfA613835bEDF60a089eC080e01489C85FafbE",
    logo: EvmosLogo,
  },
  [137]: {
    chainId: utils.hexValue(137),
    rpcUrls: ["https://polygon-rpc.com"],
    chainName: "Polygon",
    label: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
    exampleContractAddress: "0xb7A7d4f62E6A1a09C3a32356EF36f2224568C2a5",
    contractExplorerUrl:
      "https://polygonscan.com/address/0xb7A7d4f62E6A1a09C3a32356EF36f2224568C2a5",
    logo: PolygonLogo,
  },
  [42161]: {
    chainId: utils.hexValue(42161),
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    chainName: "Arbitrum One",
    label: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://arbiscan.io/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: ArbitrumLogo,
  },
  [10]: {
    chainId: utils.hexValue(10),
    rpcUrls: ["https://mainnet.optimism.io"],
    chainName: "Optimism",
    label: "Optimism",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://optimistic.etherscan.io/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: OptimismLogo,
  },
  [5]: {
    chainId: utils.hexValue(5),
    rpcUrls: ["https://goerli.infura.io/v3/"],
    chainName: "Goerli Test Network",
    label: "Goerli",
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "GoerliETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://goerli.etherscan.io/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: EthereumLogo,
  },
  [43114]: {
    chainId: utils.hexValue(43114),
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    chainName: "Avalanche Network",
    label: "Avalanche",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://snowtrace.io/"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://snowtrace.io/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: AvalancheLogo,
  },
};
