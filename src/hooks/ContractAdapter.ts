import { DataProvider } from "./DataProvider";

export interface ContractAdapter {
  getBlockNumber(rpcUrl: string): Promise<number>;
  getPrices(dataProvider: DataProvider): Promise<number[]>;
  readPrices(dataProvider: DataProvider): Promise<number[]>;
  readTimestamp(): Promise<number>;
  writePrices(dataProvider: DataProvider): Promise<string | number[]>;
}
