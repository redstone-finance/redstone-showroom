import { StarknetChainId } from "starknet";

import axios from "axios";
import { IStarknetWindowObject } from "@argent/get-starknet";
import {
  GetPricesCommand,
  ReadPricesCommand,
  ReadTimestampCommand,
  WritePricesCommand,
} from "./ContractCommands";
import { StarknetDataProvider } from "./StarknetDataProvider";

export class StarknetContract {
  constructor(
    private address: string,
    private starknet: IStarknetWindowObject | undefined,
    private network: StarknetChainId = "goerli-alpha"
  ) {}

  static async getBlockNumber(rpcUrl: string) {
    const response = await axios.post(rpcUrl, {
      jsonrpc: "2.0",
      method: "starknet_blockNumber",
      params: [],
      id: 1,
    });

    return response.data.result;
  }

  async getPrices(dataProvider: StarknetDataProvider): Promise<number[]> {
    return new GetPricesCommand(
      dataProvider,
      this.address,
      this.starknet,
      this.network
    ).execute();
  }

  async readPrices(dataProvider: StarknetDataProvider): Promise<number[]> {
    return new ReadPricesCommand(
      dataProvider,
      this.address,
      this.starknet,
      this.network
    ).execute();
  }

  async readTimestamp(): Promise<number> {
    return new ReadTimestampCommand(
      this.address,
      this.starknet,
      this.network
    ).execute();
  }

  async writePrices(dataProvider: StarknetDataProvider): Promise<string> {
    return new WritePricesCommand(
      dataProvider,
      this.address,
      this.starknet,
      this.network
    ).execute();
  }
}
