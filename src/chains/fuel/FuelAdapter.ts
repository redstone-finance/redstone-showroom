import { WalletLocked, WalletUnlocked } from "fuels";
import {
  FuelGetTimestampCommand,
  FuelReadPricesCommand,
  FuelGetPricesCommand,
  FuelWritePricesCommand,
} from "./FuelCommands";
import { DataProvider } from "../../hooks/DataProvider";
import { ContractAdapter } from "../../hooks/ContractAdapter";
import axios from "axios";

export class FuelAdapter implements ContractAdapter {
  constructor(
    private contractId: string,
    public wallet: WalletLocked | WalletUnlocked
  ) {}

  async getBlockNumber(rpcUrl: string): Promise<number> {
    const LATEST_BLOCK_QUERY =
      "query LatestBlockHeight { chain { latestBlock {  header { height } } } }";

    const response = await axios({
      url: rpcUrl,
      method: "POST",
      data: { query: LATEST_BLOCK_QUERY },
    });

    return response.data.data.chain.latestBlock.header.height;
  }

  async readTimestamp(): Promise<number> {
    return new FuelGetTimestampCommand(this.contractId, this.wallet).execute();
  }

  async readPrices(dataProvider: DataProvider): Promise<number[]> {
    return new FuelReadPricesCommand(
      this.contractId,
      this.wallet,
      dataProvider
    ).execute();
  }

  async getPrices(dataProvider: DataProvider): Promise<number[]> {
    return new FuelGetPricesCommand(
      this.contractId,
      this.wallet,
      dataProvider
    ).execute();
  }

  async writePrices(dataProvider: DataProvider): Promise<number[]> {
    return await new FuelWritePricesCommand(
      this.contractId,
      this.wallet,
      dataProvider
    ).execute();
  }
}
