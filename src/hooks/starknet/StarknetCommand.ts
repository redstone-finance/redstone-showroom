import { IStarknetWindowObject } from "@argent/get-starknet";
import { Contract, Provider, Result, StarknetChainId } from "starknet";
import * as prices_abi from "../../config/prices_abi.json";

export abstract class StarknetCommand {
  constructor(
    private contractAddress: string,
    private starknet: IStarknetWindowObject | undefined,
    private network: StarknetChainId = "goerli-alpha"
  ) {}

  abstract getMethodName(): string;
  abstract getArgs(): Promise<any>;
  abstract getValue(response: Result);

  async execute() {
    const contract = this.getContract();

    const args = await this.getArgs();

    const date = new Date().getTime();
    const response = await contract.call(this.getMethodName(), args);
    console.log(`Got values from contract ${new Date().getTime() - date}`);

    return this.getValue(response);
  }

  getContract() {
    const provider =
      this.starknet?.account ||
      new Provider({ sequencer: { network: this.network } });
    return new Contract(prices_abi, this.contractAddress, provider);
  }
}

export abstract class InvokeStarknetCommand extends StarknetCommand {
  async execute() {
    const contract = this.getContract();

    const args = await this.getArgs();
    const response = await contract.invoke(this.getMethodName(), args, {
      maxFee: 100,
    });

    return response.transaction_hash;
  }

  getValue(response: Result) {
    return undefined;
  }
}
