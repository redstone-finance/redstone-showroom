import { useState, useEffect } from "react";
import { BigNumber, providers } from "ethers";
import Web3Modal from "web3modal";
import { ChainDetails, chains } from "../config/chains";
import { emptyPrices } from "../utils";

type NetworkToAdd = Omit<
  ChainDetails,
  "exampleContractAddress" | "contractExplorerUrl" | "logo"
>;

export const useWeb3Modal = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [network, setNetwork] = useState<ChainDetails | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isChangingNetwork, setIsChangingNetwork] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    changeNetwork();
  }, [network]);

  const changeNetwork = async () => {
    if (network) {
      setIsChangingNetwork(true);
      const {
        exampleContractAddress,
        contractExplorerUrl,
        logo,
        ...restNetworkParams
      } = network;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: restNetworkParams.chainId }],
        });
        setIsChangingNetwork(false);
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await addNewNetwork(restNetworkParams);
          setIsChangingNetwork(false);
        }
        setPrices(emptyPrices);
      }
    }
  };

  const addNewNetwork = async (networkParams: NetworkToAdd) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkParams],
      });
    } catch {
      setPrices(emptyPrices);
    }
  };

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        setIsConnecting(true);
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
        setIsConnecting(false);
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
    isChangingNetwork,
    isConnecting,
  };
};
