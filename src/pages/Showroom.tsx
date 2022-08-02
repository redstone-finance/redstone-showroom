import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import { abi } from "../config/ExampleRedstoneShowroomDetails.json";
import { chains } from "../config/chains";

type ChainsConfig = keyof typeof chains;

const Showroom = () => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [network, setNetwork] = useState<providers.Network | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [price, setPrice] = useState("");

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

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        const instance = await web3Modal.connect();
        addListeners(instance);
        const provider = new providers.Web3Provider(instance);
        setNetwork(await provider.getNetwork());
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

  const getPriceFromContract = async () => {
    if (network && signer) {
      try {
        const { chainId } = network;
        const contractAddress =
          chains[chainId as ChainsConfig].exampleContractAddress;
        if (contractAddress) {
          const contract = new Contract(contractAddress, abi, signer);
          const wrappedContract = WrapperBuilder.wrapLite(
            contract
          ).usingPriceFeed("redstone", {
            asset: "ETH",
          });
          const price = await wrappedContract.getPrice();
          setPrice(utils.formatUnits(price, 8));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const networkFromConfig = chains[network?.chainId as ChainsConfig];

  return (
    <div className="flex justify-center items-center mt-16 flex-col">
      {!signer && (
        <button
          onClick={connectWallet}
          className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full"
        >
          Connect wallet
        </button>
      )}
      {signer && !networkFromConfig && (
        <p className="text-xl font-bold">Unsupported network</p>
      )}
      {networkFromConfig && (
        <div className="flex justify-center items-center mt-16 flex-col">
          <p className="text-xl mb-4">
            Network: <span className="font-bold">{networkFromConfig.name}</span>
          </p>
          {price ? (
            <p className="text-xl">
              ETH price: <span className="font-bold">{price}</span>
            </p>
          ) : (
            <button
              className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full"
              onClick={getPriceFromContract}
            >
              Get price
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Showroom;
