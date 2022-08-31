import { utils } from "ethers";
import PolygonLogo from "../assets/chains/polygon.png";
import EthereumLogo from "../assets/chains/ethereum.png";
import EvmosLogo from "../assets/chains/evmos.png";
import OptimismLogo from "../assets/chains/optimism.png";
import ArbitrumLogo from "../assets/chains/arbitrum.png";
import AvalancheLogo from "../assets/chains/avalanche.png";
import CeloLogo from "../assets/chains/celo.png";
import BnbLogo from "../assets/chains/bnb.png";
import FantomLogo from "../assets/chains/fantom.png";
import KlaytnLogo from "../assets/chains/klaytn.png";
import MoonbeamLogo from "../assets/chains/moonbeam.png";

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
  [42220]: {
    chainId: utils.hexValue(42220),
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo",
    label: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.celo.org/"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://explorer.celo.org/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: CeloLogo,
  },
  [56]: {
    chainId: utils.hexValue(56),
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    chainName: "Smart Chain",
    label: "BNB",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://bscscan.com/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: BnbLogo,
  },
  [250]: {
    chainId: utils.hexValue(250),
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    chainName: "Fantom",
    label: "Fantom",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    blockExplorerUrls: ["https://ftmscan.com/"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://ftmscan.com/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: FantomLogo,
  },
  [8217]: {
    chainId: utils.hexValue(8217),
    rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
    chainName: "Klaytn Mainnet",
    label: "Klaytn",
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    blockExplorerUrls: ["https://scope.klaytn.com"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://scope.klaytn.com/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: KlaytnLogo,
  },
  [1284]: {
    chainId: utils.hexValue(1284),
    rpcUrls: ["https://rpc.api.moonbeam.network"],
    chainName: "Moonbeam",
    label: "Moonbeam",
    nativeCurrency: {
      name: "GLMR",
      symbol: "GLMR",
      decimals: 18,
    },
    blockExplorerUrls: ["https://moonscan.io"],
    exampleContractAddress: "0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    contractExplorerUrl:
      "https://moonscan.io/address/0xFf36C21bBc28C62c91b01D8a39B6af44e75596C1",
    logo: MoonbeamLogo,
  },
};
