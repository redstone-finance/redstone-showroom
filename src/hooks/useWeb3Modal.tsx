import { useState, useEffect } from "react";
import { BigNumber, providers } from "ethers";
import Web3Modal from "web3modal";
import { ChainDetails, chains } from "../config/chains";
import { emptyPrices } from "../utils";

export const useWeb3Modal = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [network, setNetwork] = useState<ChainDetails | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    changeNetwork().catch(() => {
      handleError();
    });
  }, [network]);

  const changeNetwork = async () => {
    if (network) {
      const { exampleContractAddress, ...restNetworkParams } = network;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: restNetworkParams.chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [restNetworkParams],
            });
          } catch (addError) {
            handleError();
          }
        }
        handleError();
      }
    }
  };

  const handleError = () => {
    setPrices(emptyPrices);
    setNetwork(null);
  };

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        const instance = await web3Modal.connect();
        addListeners(instance);
        const provider = new providers.Web3Provider(instance);
        const signer = provider.getSigner();
        setSigner(signer);
        const walletAddress = await signer.getAddress();
        setWalletAddress(walletAddress);
      } catch (error: any) {
        console.error(error);
      } finally {
        setPrices(emptyPrices);
      }
    }
  };

  const addListeners = (web3ModalProvider: any) => {
    web3ModalProvider.on("accountsChanged", () => {
      window.location.reload();
    });

    web3ModalProvider.on("chainChanged", async (chainId: BigNumber) => {
      const chainIdAsNumber = Number(chainId.toString());
      const chainFromConfig = chains[chainIdAsNumber as keyof typeof chains];
      if (!chainFromConfig) {
        setNetwork(null);
      } else {
        setNetwork(chainFromConfig);
        connectWallet();
      }
    });
  };

  return {
    prices,
    setPrices,
    network,
    setNetwork,
    signer,
    connectWallet,
    walletAddress,
  };
};
