import { utils } from "ethers";
import CantoLogo from "../assets/chains/canto.png";

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
};
