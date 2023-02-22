import { useState, useEffect } from "react";
import { emptyPrices } from "../utils";
import { Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";

export const useFuel = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [fuel, setFuel] = useState<Window["fuel"]>();
  const [wallet, setWallet] = useState<
    WalletLocked | WalletUnlocked | undefined
  >(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  useEffect(() => {
    const onFuelLoaded = () => {
      setFuel(window.fuel);
    };

    if (window.fuel) {
      onFuelLoaded();
    }

    document.addEventListener("FuelLoaded", onFuelLoaded);

    return () => {
      document.removeEventListener("FuelLoaded", onFuelLoaded);
    };
  }, []);

  const changePrivateKey = async (e: any) => {
    const provider = new Provider("https://node-beta-2.fuel.network/graphql");
    let newWallet = undefined;

    try {
      newWallet = await Wallet.fromPrivateKey(e.target.value, provider);
    } catch {}

    if (newWallet && newWallet.address) {
      setWalletAddress(newWallet.address.toString());
    }
    setWallet(newWallet);
  };

  const connectWallet = async () => {
    setPrices(emptyPrices);

    if (wallet) {
      return;
    }

    setIsConnecting(true);
    setWallet(undefined);

    if (!fuel) {
      return;
    }

    const isConnected = await fuel.connect();

    if (!isConnected) {
      return setIsConnecting(false);
    }

    const account = await fuel.currentAccount();
    const newWallet = await fuel.getWallet(account);

    if (!newWallet) {
      return setIsConnecting(false);
    }

    try {
      setWalletAddress(newWallet.address.toString());
      setIsConnecting(false);

      return setWallet(newWallet);
    } catch (error: any) {
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    function reload() {
      window.location.reload();
    }

    fuel?.on(fuel.events.accounts, reload);
    fuel?.on(fuel.events.currentAccount, (account) => {
      if (account == wallet?.address.toString()) {
        return;
      }
    });
    fuel?.on(fuel.events.network, reload);
  }, [fuel, wallet]);

  return {
    prices,
    setPrices,
    wallet,
    connectWallet,
    walletAddress,
    changePrivateKey,
  };
};
