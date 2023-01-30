import { Contract, providers } from "ethers";
import { ContractConnector, PricesContractAdapter } from "redstone-sdk";
import { EvmPricesContractAdapter } from "./EvmPricesContractAdapter";
import { abi } from "./ShowroomContractAbi.json";

export class EvmPricesContractConnector
  implements ContractConnector<PricesContractAdapter>
{
  constructor(
    private readonly contractAddress: string,
    private readonly signer: providers.JsonRpcSigner
  ) {}

  getBlockNumber(rpcUrl: string): Promise<number> {
    return this.signer.provider.getBlockNumber();
  }

  async getAdapter(): Promise<PricesContractAdapter> {
    return new EvmPricesContractAdapter(
      new Contract(this.contractAddress, abi, this.signer)
    );
  }
}
