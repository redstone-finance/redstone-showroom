import {
  ContractParamsProvider,
  IPricesContractAdapter,
} from "@redstone-finance/sdk";
import { Contract } from "ethers";

import { WrapperBuilder } from "@redstone-finance/evm-connector";

export class EvmPricesContractAdapter implements IPricesContractAdapter {
  constructor(private contract: Contract) {}

  async getPricesFromPayload(
    paramsProvider: ContractParamsProvider
  ): Promise<number[]> {
    return await WrapperBuilder.wrap(this.contract)
      .usingDataService(paramsProvider.requestParams)
      .getPrices();
  }

  readPricesFromContract(
    paramsProvider: ContractParamsProvider
  ): Promise<number[]> {
    throw "Method not supported";
  }

  readTimestampFromContract(): Promise<number> {
    throw "Method not supported";
  }

  writePricesFromPayloadToContract(
    paramsProvider: ContractParamsProvider
  ): Promise<string | number[]> {
    throw "Method not supported";
  }
}
