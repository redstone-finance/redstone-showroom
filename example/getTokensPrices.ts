import { Contract, providers } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getSignersForDataServiceId } from "@redstone-finance/sdk";

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
    dataPackagesIds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
    authorizedSigners: getSignersForDataServiceId("redstone-primary-prod"),
    enableEnhancedLogs: true,
    aggregateErrors: true,
  });
  const tokenPrices = await wrappedContract.getPrices();
  console.log(tokenPrices);
})();
