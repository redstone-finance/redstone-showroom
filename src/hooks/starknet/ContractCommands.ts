import { IStarknetWindowObject } from "@argent/get-starknet";
import { Result, StarknetChainId } from "starknet";
import { StarknetDataProvider } from "./StarknetDataProvider";
import { InvokeStarknetCommand, StarknetCommand } from "./StarknetCommand";

export class GetPricesCommand extends StarknetCommand {
  constructor(
    private dataProvider: StarknetDataProvider,
    contractAddress: string,
    starknet: IStarknetWindowObject | undefined,
    network: StarknetChainId = "goerli-alpha"
  ) {
    super(contractAddress, starknet, network);
  }

  getMethodName(): string {
    return "get_prices";
  }

  async getArgs(): Promise<any[]> {
    return [
      await this.dataProvider.getDataFeedNumbers(),
      await this.dataProvider.getPayloadData(),
    ];
  }

  getValue(response: Result) {
    return response[0].map((value) => value.toNumber());
  }
}

export class ReadPricesCommand extends StarknetCommand {
  constructor(
    private dataProvider: StarknetDataProvider,
    contractAddress: string,
    starknet: IStarknetWindowObject | undefined,
    network: StarknetChainId = "goerli-alpha"
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
    return response[0].map((value) => value.toNumber());
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
    private dataProvider: StarknetDataProvider,
    contractAddress: string,
    starknet: IStarknetWindowObject | undefined,
    network: StarknetChainId = "goerli-alpha"
  ) {
    super(contractAddress, starknet, network);
  }

  getMethodName(): string {
    return "save_prices";
  }

  async getArgs(): Promise<any> {
    return [
      await this.dataProvider.getDataFeedNumbers(),
      await this.dataProvider.getPayloadData(),
    ];
  }
}
