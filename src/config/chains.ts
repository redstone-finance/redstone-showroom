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
import zkSyncLogo from "../assets/chains/zk-sync.png";
import AuroraLogo from "../assets/chains/aurora.png";
import ScrollLogo from "../assets/chains/scroll.png";
import DogechainLogo from "../assets/chains/dogechain.png";
import MantleLogo from "../assets/chains/mantle.png";
import WagmiLogo from "../assets/chains/wagmi-testnet.png";
import PolygonZkEVMLogo from "../assets/chains/polygon-zk-evm.png";
import CantoLogo from "../assets/chains/canto.png";
import BaseLogo from "../assets/chains/base.png";
import StarknetLogo from "../assets/chains/starknet.png";

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
  txExplorerUrl?: string;
  logo?: any;
  isStarknet?: boolean;
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
    blockExplorerUrls: ["https://evm.evmos.org/"],
    exampleContractAddress: "0x2e441adc345daeb11ff9c2cae7efd461e5525850",
    contractExplorerUrl:
      "https://evm.evmos.org/address/0x2e441adc345daeb11ff9c2cae7efd461e5525850",
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
    exampleContractAddress: "0x0721b16dDC4931472b69855A5C149443C232205F",
    contractExplorerUrl:
      "https://polygonscan.com/address/0x0721b16dDC4931472b69855A5C149443C232205F",
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
    blockExplorerUrls: ["https://arbiscan.io/"],
    exampleContractAddress: "0x2e441adc345daeb11ff9c2cae7efd461e5525850",
    contractExplorerUrl:
      "https://arbiscan.io/address/0x2e441adc345daeb11ff9c2cae7efd461e5525850",
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
    blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    exampleContractAddress: "0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
    contractExplorerUrl:
      "https://optimistic.etherscan.io/address/0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
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
    exampleContractAddress: "0xC9BE33f28520B1D94614039Ed06D5e8ed2cee048",
    contractExplorerUrl:
      "https://goerli.etherscan.io/address/0xC9BE33f28520B1D94614039Ed06D5e8ed2cee048",
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
    exampleContractAddress: "0x4d58dbF4a921FdD964Ece0732B1577cC25662587",
    contractExplorerUrl:
      "https://snowtrace.io/address/0x4d58dbF4a921FdD964Ece0732B1577cC25662587",
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
    exampleContractAddress: "0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
    contractExplorerUrl:
      "https://explorer.celo.org/address/0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
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
    blockExplorerUrls: ["https://bscscan.com/"],
    exampleContractAddress: "0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
    contractExplorerUrl:
      "https://bscscan.com/address/0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
    logo: BnbLogo,
  },
  [250]: {
    chainId: utils.hexValue(250),
    rpcUrls: ["https://rpc.ankr.com/fantom/"],
    chainName: "Fantom",
    label: "Fantom",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    blockExplorerUrls: ["https://ftmscan.com/"],
    exampleContractAddress: "0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
    contractExplorerUrl:
      "https://ftmscan.com/address/0x2e441aDC345dAeB11Ff9c2caE7eFD461E5525850",
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
    blockExplorerUrls: ["https://scope.klaytn.com/"],
    exampleContractAddress: "0x2e441adc345daeb11ff9c2cae7efd461e5525850",
    contractExplorerUrl:
      "https://scope.klaytn.com/address/0x2e441adc345daeb11ff9c2cae7efd461e5525850",
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
    blockExplorerUrls: ["https://moonscan.io/"],
    exampleContractAddress: "0xd75F4B5AA9480E6956f2570Dd258ca716784f6E1",
    contractExplorerUrl:
      "https://moonscan.io/address/0xd75F4B5AA9480E6956f2570Dd258ca716784f6E1",
    logo: MoonbeamLogo,
  },
  [280]: {
    chainId: utils.hexValue(280),
    rpcUrls: ["https://zksync2-testnet.zksync.dev"],
    chainName: "zkSync Era Testnet",
    label: "zkSync Era Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.explorer.zksync.io/"],
    exampleContractAddress: "0xfC751219f2d99f9fE01e777625352Fe22D37433A",
    contractExplorerUrl:
      "https://goerli.explorer.zksync.io/address/0xfC751219f2d99f9fE01e777625352Fe22D37433A",
    logo: zkSyncLogo,
  },
  [1313161554]: {
    chainId: utils.hexValue(1313161554),
    rpcUrls: ["https://mainnet.aurora.dev"],
    chainName: "Aurora",
    label: "Aurora",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://aurorascan.dev/"],
    exampleContractAddress: "0x1a6bbc6Ff8BEeE20B4177Ac87580F4e2aF3Abf71",
    contractExplorerUrl:
      "https://aurorascan.dev/address/0x1a6bbc6Ff8BEeE20B4177Ac87580F4e2aF3Abf71",
    logo: AuroraLogo,
  },
  [534354]: {
    chainId: utils.hexValue(534354),
    rpcUrls: ["https://prealpha.scroll.io/l2"],
    chainName: "Scroll L2 Testnet",
    label: "Scroll",
    nativeCurrency: {
      name: "TSETH",
      symbol: "TSETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://l2scan.scroll.io/"],
    exampleContractAddress: "0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    contractExplorerUrl:
      "https://l2scan.scroll.io/address/0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    logo: ScrollLogo,
  },
  [2000]: {
    chainId: utils.hexValue(2000),
    rpcUrls: ["https://rpc.dogechain.dog"],
    chainName: "Dogechain",
    label: "Dogechain",
    nativeCurrency: {
      name: "DOGE",
      symbol: "DOGE",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.dogechain.dog/"],
    exampleContractAddress: "0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    contractExplorerUrl:
      "https://explorer.dogechain.dog/address/0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    logo: DogechainLogo,
  },
  [5001]: {
    chainId: utils.hexValue(5001),
    rpcUrls: ["​​https://rpc.testnet.mantle.xyz/"],
    chainName: "Mantle Testnet",
    label: "Mantle",
    nativeCurrency: {
      name: "BIT",
      symbol: "BIT",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
    exampleContractAddress: "0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    contractExplorerUrl:
      "https://explorer.testnet.mantle.xyz/address/0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    logo: MantleLogo,
  },
  [11111]: {
    chainId: utils.hexValue(11111),
    rpcUrls: ["https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc"],
    chainName: "WAGMI",
    label: "WAGMI Testnet",
    nativeCurrency: {
      name: "WGM",
      symbol: "WGM",
      decimals: 18,
    },
    blockExplorerUrls: ["https://subnets-test.avax.network/wagmi/"],
    exampleContractAddress: "0xd75F4B5AA9480E6956f2570Dd258ca716784f6E1",
    contractExplorerUrl:
      "https://subnets-test.avax.network/wagmi/address/0xd75F4B5AA9480E6956f2570Dd258ca716784f6E1",
    logo: WagmiLogo,
  },
  [1422]: {
    chainId: utils.hexValue(1422),
    rpcUrls: ["https://rpc.public.zkevm-test.net"],
    chainName: "Polygon zkEVM Testnet",
    label: "Polygon zkEVM Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.public.zkevm-test.net/"],
    exampleContractAddress: "0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    contractExplorerUrl:
      "https://explorer.public.zkevm-test.net/address/0xaCf97fb2f2c336c45b799DAB925ad10ADC70fCAC",
    logo: PolygonZkEVMLogo,
  },
  [7700]: {
    chainId: utils.hexValue(7700),
    rpcUrls: ["https://canto.slingshot.finance"],
    chainName: "Canto",
    label: "Canto",
    nativeCurrency: {
      name: "CANTO",
      symbol: "CANTO",
      decimals: 18,
    },
    blockExplorerUrls: ["https://evm.explorer.canto.io/"],
    exampleContractAddress: "0xf16dA7ABcac966B3ba9c1DFa17D8A9626237bcf8",
    contractExplorerUrl:
      "https://evm.explorer.canto.io/address/0xf16dA7ABcac966B3ba9c1DFa17D8A9626237bcf8",
    logo: CantoLogo,
  },
  [84531]: {
    chainId: utils.hexValue(84531),
    rpcUrls: ["https://goerli.base.org"],
    chainName: "Base Goerli",
    label: "Base Goerli",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.basescan.org/"],
    exampleContractAddress: "0xd75F4B5AA9480E6956f2570Dd258ca716784f6E1",
    contractExplorerUrl:
      "https://goerli.basescan.org/address/0xd75f4b5aa9480e6956f2570dd258ca716784f6e1",
    logo: BaseLogo,
  },
  [9999999999]: {
    chainId: utils.hexValue(9999999999),
    rpcUrls: [
      "https://starknet-goerli.infura.io/v3/0d9bfc9a170947ce8c4f2e15dae7c62a",
    ],
    chainName: "Starknet Test Network",
    label: "Starknet",
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "GoerliETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.starkscan.co/"],
    exampleContractAddress:
      "0x03179859e543c1b6f13bf23a9a6de17e04a3a34bdc277ea21010598ba3c9b120",
    contractExplorerUrl:
      "https://testnet.starkscan.co/contract/0x03179859e543c1b6f13bf23a9a6de17e04a3a34bdc277ea21010598ba3c9b120",
    txExplorerUrl: "https://testnet.starkscan.co/tx/",
    logo: StarknetLogo,
    isStarknet: true,
  },
};
