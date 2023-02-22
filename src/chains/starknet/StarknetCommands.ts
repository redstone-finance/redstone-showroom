import { BigNumberish, Result, StarknetChainId } from "starknet";
import { DataProvider } from "../../hooks/DataProvider";
import { InvokeStarknetCommand, StarknetCommand } from "./StarknetCommand";
import { IStarknetWindowObject } from "@argent/get-starknet";

export class GetPricesCommand extends StarknetCommand {
  constructor(
    starknet: IStarknetWindowObject | undefined,
    contractAddress: string,
    network = "goerli-alpha",
    private dataProvider: DataProvider
  ) {
    super(contractAddress, starknet, network);
  }

  getMethodName(): string {
    return "get_prices";
  }

  async getArgs(): Promise<any[]> {
    return [
      await this.dataProvider.getDataFeedNumbers(),
      DataProvider.splitPayloadData(await this.dataProvider.getPayloadData()),
    ];
  }

  getValue(response: Result) {
    return response[0].map((value: BigNumberish) => value.toNumber());
  }
}

export class ReadPricesCommand extends StarknetCommand {
  constructor(
    starknet: IStarknetWindowObject | undefined,
    contractAddress: string,
    network = "goerli-alpha",
    private dataProvider: DataProvider
  ) {
    super(contractAddress, starknet, network);
  }

  getMethodName(): string {
    return "get_saved_prices";
  }

  async getArgs(): Promise<any[]> {
    return [await this.dataProvider.getDataFeedNumbers()];
  }

  getValue(response: Result) {
    return response[0].map((value: BigNumberish) => value.toNumber());
  }
}

export class ReadTimestampCommand extends StarknetCommand {
  getMethodName(): string {
    return "get_saved_timestamp";
  }

  async getArgs(): Promise<any> {
    return [];
  }

  getValue(response: Result) {
    return response[0].toNumber() * 1000;
  }
}

export class WritePricesCommand extends InvokeStarknetCommand {
  constructor(
    network = "goerli-alpha",
    contractAddress: string,
    starknet: IStarknetWindowObject | undefined,
    private dataProvider: DataProvider
  ) {
    super(contractAddress, starknet, network);
  }

  getMethodName(): string {
    return "save_prices";
  }

  async getArgs(): Promise<any> {
    return [
      await this.dataProvider.getDataFeedNumbers(),
      DataProvider.splitPayloadData(await this.dataProvider.getPayloadData()),
    ];
  }
}
