import { ContractAdapter } from "../../hooks/ContractAdapter";
import { DataProvider } from "../../hooks/DataProvider";
import { Contract, providers } from "ethers";
import { usePricesData } from "./usePricesData";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { abi } from "./ShowroomContractAbi.json";

export class EthAdapter implements ContractAdapter {
  constructor(
    private readonly contractAddress: string,
    private readonly signer: providers.JsonRpcSigner
  ) {}

  getBlockNumber(rpcUrl: string): Promise<number> {
    return this.signer.provider.getBlockNumber();
  }

  async getPrices(dataProvider: DataProvider): Promise<number[]> {
    const contract = new Contract(this.contractAddress, abi, this.signer);
    const wrappedContract = WrapperBuilder.wrap(contract).usingDataService(
      dataProvider.requestParams,
      [dataProvider.dataServiceUrl]
    );

    return wrappedContract.getPrices();
  }

  readPrices(dataProvider: DataProvider): Promise<number[]> {
    return Promise.reject();
  }

  readTimestamp(): Promise<number> {
    const { getPricesTimestamp } = usePricesData();

    return getPricesTimestamp();
  }

  writePrices(dataProvider: DataProvider): Promise<string> {
    return Promise.reject();
  }
}
