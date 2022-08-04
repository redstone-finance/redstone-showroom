import { useState, useEffect } from "react";
import { providers } from "ethers";
import Web3Modal from "web3modal";
import { ChainDetails } from "../config/chains";

interface SelectOption<T> {
  label: string;
  value: T;
}

type NetworkSelectValue = SelectOption<Omit<ChainDetails, "chainName">>;

export const useWeb3Modal = () => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [network, setNetwork] = useState<NetworkSelectValue | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  useEffect(() => {
    if (network) {
      const { exampleContractAddress, ...restNetwork } = network.value;
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [restNetwork],
      });
    }
  }, [network]);

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        const instance = await web3Modal.connect();
        addListeners(instance);
        const provider = new providers.Web3Provider(instance);
        setSigner(provider.getSigner());
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const addListeners = (web3ModalProvider: any) => {
    web3ModalProvider.on("accountsChanged", () => {
      window.location.reload();
    });

    web3ModalProvider.on("chainChanged", () => {
      window.location.reload();
    });
  };

  return { network, setNetwork, signer, connectWallet };
};
