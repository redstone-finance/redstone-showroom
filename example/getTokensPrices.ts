import { Contract, providers } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";

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
  const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
    dataServiceId: "redstone-main-demo",
    uniqueSignersCount: 1,
    dataPackagesIds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
  });
  const tokenPrices = await wrappedContract.getPrices();
  console.log(tokenPrices);
})();
