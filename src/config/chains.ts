import { ethers } from "ethers";
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
    chainId: ethers.utils.hexValue(9001),
    rpcUrls: ["https://eth.bd.evmos.org:8545"],
    chainName: "Evmos Mainnet",
    nativeCurrency: {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
    },
    blockExplorerUrls: ["https://evm.evmos.org"],
    exampleContractAddress: "0x7A8e56c69Cae266D915FC37892Bd959CF844d53f",
    contractExplorerUrl:
      "https://evm.evmos.org/address/0x7A8e56c69Cae266D915FC37892Bd959CF844d53f",
    logo: EvmosLogo,
  },
  [137]: {
    chainId: ethers.utils.hexValue(137),
    rpcUrls: ["https://polygon-rpc.com"],
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
    exampleContractAddress: "0x5Bf1cd8CC736096aF9b01400F836FC16A7E490C9",
    contractExplorerUrl:
      "https://polygonscan.com/address/0x5Bf1cd8CC736096aF9b01400F836FC16A7E490C9",
    logo: PolygonLogo,
  },
  [3]: {
    chainId: ethers.utils.hexValue(3),
    rpcUrls: ["https://ropsten.infura.io/v3/"],
    chainName: "Ropsten Test Network",
    nativeCurrency: {
      name: "RopstenETH",
      symbol: "RopstenETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://ropsten.etherscan.io/"],
    exampleContractAddress: "0xcB494d8dB930cD8aCcA4434197AACb9db44Af478",
    contractExplorerUrl:
      "https://ropsten.etherscan.io/address/0xcB494d8dB930cD8aCcA4434197AACb9db44Af478",
    logo: EthereumLogo,
  },
};
