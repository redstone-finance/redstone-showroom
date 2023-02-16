import { StarknetChainId } from "starknet";

import axios from "axios";
import { IStarknetWindowObject } from "@argent/get-starknet";
import {
  GetPricesCommand,
  ReadPricesCommand,
  ReadTimestampCommand,
  WritePricesCommand,
} from "./StarknetCommands";
import { DataProvider } from "../../hooks/DataProvider";
import { ContractAdapter } from "../../hooks/ContractAdapter";

export class StarknetAdapter implements ContractAdapter {
  constructor(
    private contractAddress: string,
    private starknet: IStarknetWindowObject | undefined,
    private network: StarknetChainId = "goerli-alpha"
  ) {}

  async getBlockNumber(rpcUrl: string): Promise<number> {
    const response = await axios.post(rpcUrl, {
      jsonrpc: "2.0",
      method: "starknet_blockNumber",
      params: [],
      id: 1,
    });

    return response.data.result;
  }

  async getPrices(dataProvider: DataProvider): Promise<number[]> {
    return new GetPricesCommand(
      this.starknet,
      this.contractAddress,
      this.network,
      dataProvider
    ).execute();
  }

  async readPrices(dataProvider: DataProvider): Promise<number[]> {
    return new ReadPricesCommand(
      this.starknet,
      this.contractAddress,
      this.network,
      dataProvider
    ).execute();
  }

  async readTimestamp(): Promise<number> {
    return new ReadTimestampCommand(
      this.contractAddress,
      this.starknet,
      this.network
    ).execute();
  }

  async writePrices(dataProvider: DataProvider): Promise<string> {
    return new WritePricesCommand(
      this.network,
      this.contractAddress,
      this.starknet,
      dataProvider
    ).execute();
  }
}
