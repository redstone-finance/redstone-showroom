import { useEffect, useState } from "react";
import { emptyPrices } from "../utils";
import { Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";
import { Fuel, FuelWalletLocked } from "@fuel-wallet/sdk";

export const useFuel = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [fuelConnector, setFuelConnector] = useState<Fuel | undefined>();
  const [hasConnector, setHasConnector] = useState<boolean>();
  const [wallet, setWallet] = useState<
    WalletLocked | WalletUnlocked | undefined
  >(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

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

  const connectWallet = async (
    fuelConnector: Fuel,
    hasConnector: boolean
  ): Promise<unknown> => {
    setPrices(emptyPrices);

    if (wallet) {
      return;
    }

    setHasConnector(hasConnector);
    setFuelConnector(fuelConnector);
    setIsConnecting(true);
    setWallet(undefined);

    if (!hasConnector) {
      return;
    }

    const isConnected = await fuelConnector.connect();

    if (!isConnected) {
      return setIsConnecting(false);
    }

    let newWallet: FuelWalletLocked | undefined = undefined;

    try {
      const account = await fuelConnector.currentAccount();
      newWallet = await fuelConnector.getWallet(account!);
    } catch (error: any) {
      console.log(error); // Mostly in case when the only one of the accounts is connected.

      await fuelConnector.disconnect();
      return await connectWallet(fuelConnector, hasConnector);
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
      console.error("RELOAD");
      // window.location.reload();
    }

    fuelConnector?.on(fuelConnector.events.accounts, reload);
    fuelConnector?.on(fuelConnector.events.currentAccount, (account) => {
      if (account == wallet?.address.toString()) {
        return;
      }
      reload();
    });
    fuelConnector?.on(fuelConnector.events.networks, reload);
  }, [wallet, walletAddress]);

  return {
    prices,
    setPrices,
    wallet,
    connectWallet,
    walletAddress,
    hasConnector,
    changePrivateKey,
  };
};
