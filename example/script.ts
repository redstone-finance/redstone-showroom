import { Contract, providers } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";

const contractAddress = "";
const abi = "";

const PROVIDER_RPC = {
  name: "",
  rpc: "",
  chainId: 0,
};

const provider = new providers.JsonRpcProvider(PROVIDER_RPC.rpc, {
  name: PROVIDER_RPC.name,
  chainId: PROVIDER_RPC.chainId,
});

(async () => {
  const contract = new Contract(contractAddress, abi, provider);
  const wrappedContract =
    WrapperBuilder.wrapLite(contract).usingPriceFeed("redstone-rapid");
  const btcPriceFromContract = await wrappedContract.getBTCPrice();
  console.log(btcPriceFromContract);
})();
