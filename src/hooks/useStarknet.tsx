import { useState, useEffect } from "react";
import { emptyPrices } from "../utils";
import { connect, IStarknetWindowObject } from "@argent/get-starknet";

export const useStarknet = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [starknet, setStarknet] = useState<IStarknetWindowObject | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  useEffect(() => {}, []);

  const connectWallet = async () => {
    setPrices(emptyPrices);

    if (starknet) {
      return;
    }

    setIsConnecting(true);
    setStarknet(undefined);

    const newStarknet = await connect();

    if (!newStarknet) {
      return setIsConnecting(false);
    }

    try {
      const [address] = await newStarknet.enable();

      if (!newStarknet.isConnected) {
        return setIsConnecting(false);
      }

      setWalletAddress(address);
      setIsConnecting(false);

      addListeners(newStarknet);

      return setStarknet(newStarknet);
    } catch (error: any) {
    } finally {
      setIsConnecting(false);
    }
  };

  const addListeners = (starknet: IStarknetWindowObject) => {
    starknet.on("accountsChanged", () => {
      window.location.reload();
    });

    starknet.on("networkChanged", () => {
      window.location.reload();
    });
  };

  return {
    prices,
    setPrices,
    starknet,
    connectWallet,
    walletAddress,
  };
};
