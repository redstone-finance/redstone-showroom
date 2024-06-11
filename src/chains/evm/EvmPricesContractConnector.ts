import { Contract, providers } from "ethers";
import {
  IContractConnector,
  IPricesContractAdapter,
} from "@redstone-finance/sdk";
import { EvmPricesContractAdapter } from "./EvmPricesContractAdapter";
import { abi } from "./ShowroomContractAbi.json";

export class EvmPricesContractConnector
  implements IContractConnector<IPricesContractAdapter>
{
  constructor(
    private readonly contractAddress: string,
    private readonly signer: providers.JsonRpcSigner
  ) {}

  getBlockNumber(): Promise<number> {
    return this.signer.provider.getBlockNumber();
  }

  async getAdapter(): Promise<IPricesContractAdapter> {
    return new EvmPricesContractAdapter(
      new Contract(this.contractAddress, abi, this.signer)
    );
  }

  waitForTransaction(txId: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
