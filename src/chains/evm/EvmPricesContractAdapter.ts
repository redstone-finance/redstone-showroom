import { ContractParamsProvider, PricesContractAdapter } from "redstone-sdk";
import { Contract } from "ethers";

import { WrapperBuilder } from "@redstone-finance/evm-connector";

export class EvmPricesContractAdapter implements PricesContractAdapter {
  constructor(private contract: Contract) {}

  async getPricesFromPayload(
    paramsProvider: ContractParamsProvider
  ): Promise<number[]> {
    return await WrapperBuilder.wrap(this.contract)
      .usingDataService(paramsProvider.requestParams, paramsProvider.urls)
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
