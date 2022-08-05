import { useState } from "react";
import Select from "react-select";
import { Contract, utils, providers } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { useMockLoader } from "../hooks/useMockLoader";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { ConnectButton } from "../components/ConnectButton";
import { chains } from "../config/chains";
import { abi } from "../config/ExampleRedstoneShowroomDetails.json";
import { GetPriceButton } from "../components/GetPriceButton";
import Modal from "../components/Modal";

const chainsArray = Object.values(chains).map((chain) => ({
  value: chain,
  label: chain.chainName,
}));

export const Showroom = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const { price, setPrice, network, setNetwork, signer, connectWallet } =
    useWeb3Modal();

  const getPriceFromContract = async () => {
    if (network && signer) {
      try {
        startMockLoader();
        setIsLoading(true);
        const contractAddress = network.value.exampleContractAddress;
        if (contractAddress) {
          const price = await fetchPrice(contractAddress, signer);
          setPrice(utils.formatUnits(price, 8));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        handleError();
      }
    } else {
      handleError();
    }
  };

  const fetchPrice = async (
    contractAddress: string,
    signer: providers.JsonRpcSigner
  ) => {
    const contract = new Contract(contractAddress, abi, signer);
    const wrappedContract = WrapperBuilder.wrapLite(contract).usingPriceFeed(
      "redstone",
      {
        asset: "ETH",
      }
    );
    return await wrappedContract.getPrice();
  };

  const handleError = () => {
    setIsLoading(false);
    setPrice("");
    setIsMockLoading(false);
    setErrorMessage(
      "There was problem with fetching data from smart contract. Please try again or contact RedStone team"
    );
  };

  return (
    <div className="flex justify-center items-center flex-col ">
      {!signer ? (
        <ConnectButton connectWallet={connectWallet} />
      ) : (
        <div className="flex w-full justify-center items-center mt-16 flex-col">
          <Select
            className="w-1/4 mb-12"
            value={network}
            onChange={setNetwork}
            options={chainsArray}
            defaultValue={network}
            placeholder="Select network..."
          />
          {isMockLoading || isLoading ? (
            <GetPriceLoader text={isMockLoading ? text : ""} />
          ) : price ? (
            <p className="text-xl">
              ETH price: <span className="font-bold">{price}</span>
            </p>
          ) : (
            network && (
              <GetPriceButton getPriceFromContract={getPriceFromContract} />
            )
          )}
        </div>
      )}
      {!!errorMessage && (
        <Modal
          closeModal={() => setErrorMessage("")}
          title="Problem with contract interaction"
          text={errorMessage}
        />
      )}
    </div>
  );
};
