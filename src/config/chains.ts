import { utils } from "ethers";
// import ArbitrumLogo from "../assets/chains/arbitrum.png";
import FuelLogo from "../assets/chains/fuel.svg";

export type Chains = { [chainId in number]: ChainDetails };

export type ChainType = "eth" | "starknet" | "fuel";

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
  type?: ChainType;
}

export const chains: Chains = {
  [9999999999]: {
    chainId: utils.hexValue(9999999999),
    rpcUrls: ["https://beta-3.fuel.network/graphql"],
    chainName: "Fuel Beta-3 Network",
    label: "Fuel",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://fuellabs.github.io/block-explorer-v2/block/"],
    exampleContractAddress:
      "0x97bf8072e4fb10997136bc8574ac9cc0ebf9960dc81fd04bb46c8d9f165b725b",
    contractExplorerUrl:
      "https://fuellabs.github.io/block-explorer-v2/beta-3/#/address/{walletAddress}",
    txExplorerUrl:
      "https://fuellabs.github.io/block-explorer-v2/beta-3/#/transaction/",
    logo: FuelLogo,
    type: "fuel",
  },
};
