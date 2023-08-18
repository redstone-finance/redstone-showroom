import { mnemonicToWalletKey } from "ton-crypto";
import { useState } from "react";
import { emptyPrices } from "../utils";
import { KeyPair } from "ton-crypto/dist/primitives/nacl";

export const useTon = () => {
  const [prices, setPrices] = useState(emptyPrices);

  const [walletKey, setWalletKey] = useState<KeyPair | undefined>(undefined);
  const [_, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setPrices(emptyPrices);

    if (walletKey) {
      return;
    }

    setIsConnecting(true);

    const key = await mnemonicToWalletKey(
      process.env.TON_WALLET_MNEMONIC!.split(" ")
    );
    setWalletKey(key);

    setIsConnecting(false);
  };

  return {
    prices,
    setPrices,
    walletKey,
    connectWallet,
  };
};
