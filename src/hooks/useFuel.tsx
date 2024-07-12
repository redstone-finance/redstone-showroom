import { useEffect, useState } from "react";
import { emptyPrices } from "../utils";
import { Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";
import { Fuel, FuelWalletConnector, FuelWalletLocked } from "@fuel-wallet/sdk";

export const useFuel = () => {
  const fuel = new Fuel({ connectors: [new FuelWalletConnector()] });
  const [prices, setPrices] = useState(emptyPrices);
  // const [fuel, setFuel] = useState<Window["fuel"]>();
  const [wallet, setWallet] = useState<
    WalletLocked | WalletUnlocked | undefined
  >(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  useEffect(() => {
    // const onFuelLoaded = () => {
    //   setFuel(window.fuel);
    // };
    //
    // if (window.fuel) {
    //   onFuelLoaded();
    // }
    // document.addEventListener("FuelLoaded", onFuelLoaded);
    //
    // return () => {
    //   document.removeEventListener("FuelLoaded", onFuelLoaded);
    // };
  }, []);

  const changePrivateKey = async (e: any) => {
    const provider = await Provider.create(
      "https://testnet.fuel.network/v1/graphql"
    );
    let newWallet = undefined;

    try {
      newWallet = await Wallet.fromPrivateKey(e.target.value, provider);
    } catch {}

    if (newWallet && newWallet.address) {
      setWalletAddress(newWallet.address.toString());
    }
    setWallet(newWallet);
  };

  const connectWallet = async (): Promise<unknown> => {
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

    let newWallet: FuelWalletLocked | undefined = undefined;

    try {
      const account = await fuel.currentAccount();
      newWallet = await fuel.getWallet(account!);
    } catch (error: any) {
      console.log(error); // Mostly in case when the only one of the accounts is connected.

      await fuel.disconnect();
      return await connectWallet();
    }

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
      // window.location.reload();
    }

    fuel?.on(fuel.events.accounts, reload);
    fuel?.on(fuel.events.currentAccount, (account) => {
      if (account == wallet?.address.toString()) {
        return;
      }
      reload();
    });
    fuel?.on(fuel.events.networks, reload);
  }, [wallet, walletAddress]);

  return {
    prices,
    setPrices,
    wallet,
    connectWallet,
    walletAddress,
    changePrivateKey,
  };
};
