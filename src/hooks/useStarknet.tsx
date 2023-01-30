import { useState, useEffect } from "react";
import { emptyPrices } from "../utils";
import { connect, IStarknetWindowObject } from "@argent/get-starknet";
import { ChainDetails } from "../config/chains";

export const useStarknet = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [starknet, setStarknet] = useState<IStarknetWindowObject | undefined>(
    undefined
  );
  const [network, setNetwork] = useState<ChainDetails | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    changeNetwork();
  }, [network]);

  const changeNetwork = async () => {
    if (network) {
      if (network.isStarknet == true) {
        setNetwork(network);
        await connectWallet();

        return;
      }
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setStarknet(undefined);
    setPrices(emptyPrices);

    const starknet = await connect();

    if (!starknet) {
      return setIsConnecting(false);
    }

    try {
      const [walletAddress] = await starknet.enable();

      if (!starknet.isConnected) {
        return setIsConnecting(false);
      }

      setWalletAddress(walletAddress);
      setIsConnecting(false);

      addListeners(starknet);

      return setStarknet(starknet);
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
