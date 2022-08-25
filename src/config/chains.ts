import { utils } from "ethers";
import PolygonLogo from "../assets/chains/polygon.png";
import EthereumLogo from "../assets/chains/ethereum.png";
import EvmosLogo from "../assets/chains/evmos.png";

export type Chains = { [chainId in number]: ChainDetails };

export interface ChainDetails {
  chainId: string;
  rpcUrls: string[];
  chainName: string;
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
  [3]: {
    chainId: utils.hexValue(3),
    rpcUrls: ["https://ropsten.infura.io/v3/"],
    chainName: "Ropsten Test Network",
    nativeCurrency: {
      name: "RopstenETH",
      symbol: "RopstenETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://ropsten.etherscan.io/"],
    exampleContractAddress: "0xFe627d6dEFD226eC9bB53177928a1D7Dfbc6c98e",
    contractExplorerUrl:
      "https://ropsten.etherscan.io/address/0xFe627d6dEFD226eC9bB53177928a1D7Dfbc6c98e",
    logo: EthereumLogo,
  },
};
