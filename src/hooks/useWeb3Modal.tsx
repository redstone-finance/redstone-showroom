import { useState, useEffect } from "react";
import { BigNumber, providers } from "ethers";
import Web3Modal from "web3modal";
import { ChainDetails, chains } from "../config/chains";
import { emptyPrices } from "../utils";
import { connect, IStarknetWindowObject } from "@argent/get-starknet";

type NetworkToAdd = Omit<
  ChainDetails,
  "exampleContractAddress" | "contractExplorerUrl" | "logo" | "label"
>;

export const useWeb3Modal = () => {
  const [prices, setPrices] = useState(emptyPrices);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [network, setNetwork] = useState<ChainDetails | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [starknet, setStarknet] = useState<IStarknetWindowObject | undefined>(
    undefined
  );
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
        label,
        ...restNetworkParams
      } = network;

      if (network.isStarknet == true) {
        setIsChangingNetwork(false);
        setNetwork(network);
        await connectStarknetWallet();

        return;
      }

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
      } finally {
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
    } catch (error) {
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

  const reconnectWallet = async () => {
    if (web3Modal) {
      const instance = await web3Modal.connect();
      const provider = new providers.Web3Provider(instance);
      const signer = provider.getSigner();
      setSigner(signer);
      const walletAddress = await signer.getAddress();
      setWalletAddress(walletAddress);
    }
  };

  const connectStarknetWallet = async () => {
    setIsConnecting(true);
    setStarknet(undefined);
    setSigner(null);
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

      addStarknetListeners(starknet);

      return setStarknet(starknet);
    } catch (error: any) {
    } finally {
      setIsConnecting(false);
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
        await reconnectWallet();
      }
    });
  };

  const addStarknetListeners = (starknet: IStarknetWindowObject) => {
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
    network,
    setNetwork,
    signer,
    starknet,
    connectWallet,
    connectStarknetWallet,
    walletAddress,
    isChangingNetwork,
    isConnecting,
  };
};
