import { useState } from "react";
import Select from "react-select";
import { Contract, utils } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import { abi } from "../config/ExampleRedstoneShowroomDetails.json";
import { chains } from "../config/chains";
import { useWeb3Modal } from "../hooks/useWeb3Modal";

const chainsArray = Object.values(chains).map((chain) => ({
  value: chain,
  label: chain.chainName,
}));

export const Showroom = () => {
  const [price, setPrice] = useState("");
  const { network, setNetwork, signer, connectWallet } = useWeb3Modal();

  const getPriceFromContract = async () => {
    if (network && signer) {
      try {
        const contractAddress = network.value.exampleContractAddress;
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

  return (
    <div className="flex justify-center items-center flex-col mt-16 ">
      {!signer ? (
        <button
          onClick={connectWallet}
          className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full"
        >
          Connect wallet
        </button>
      ) : (
        <div className="flex w-full justify-center items-center mt-16 flex-col">
          <Select
            className="w-1/4 mb-8"
            value={network}
            onChange={setNetwork}
            options={chainsArray}
            defaultValue={network}
          />
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
