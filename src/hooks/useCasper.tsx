import { useState } from "react";
import { emptyPrices } from "../utils";
import {
  CasperWalletInterface,
  CasperWindow,
} from "@redstone-finance/casper-connector";

const REQUESTS_TIMEOUT_MS = 30 * 60 * 1000;

const casperWindow = window as unknown as CasperWindow;

export const getProvider = () => {
  let providerConstructor = casperWindow.CasperWalletProvider;
  if (providerConstructor === undefined) {
    alert("Casper Wallet extension is not installed!");
    return;
  }
  return providerConstructor({
    timeout: REQUESTS_TIMEOUT_MS,
  });
};

export const useCasper = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [provider, setProvider] = useState<CasperWalletInterface | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setPrices(emptyPrices);

    if (provider) {
      console.log("exitting 1");
      return;
    }

    setIsConnecting(true);
    setProvider(undefined);

    const newProvider = getProvider();

    if (!newProvider) {
      console.log("exitting 2");
      return setIsConnecting(false);
    }

    try {
      await newProvider.requestConnection();
      const isConnected = await newProvider.isConnected();

      if (!isConnected) {
        console.log("exitting 3");
        return setIsConnecting(true);
      }

      setWalletAddress(await newProvider.getActivePublicKey());
      setIsConnecting(false);

      // addListeners(newProvider);

      return setProvider(newProvider);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  // const addListeners = (starknet: IStarknetWindowObject) => {
  //   starknet.on("accountsChanged", () => {
  //     window.location.reload();
  //   });
  //
  //   starknet.on("networkChanged", () => {
  //     window.location.reload();
  //   });
  // };

  return {
    prices,
    setPrices,
    provider,
    connectWallet,
    walletAddress,
  };
};
