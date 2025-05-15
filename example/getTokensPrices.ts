import { Contract, providers } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getOracleRegistryState, getSignersForDataServiceId } from "@redstone-finance/sdk";

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
    dataServiceId: "redstone-primary-prod",
    uniqueSignersCount: 3,
    dataPackagesIds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
    authorizedSigners: getSignersForDataServiceId(await getOracleRegistryState(), "redstone-primary-prod"),
  });
  const tokenPrices = await wrappedContract.getPrices();
  console.log(tokenPrices);
})();
