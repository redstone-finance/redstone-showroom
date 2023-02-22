import { WalletUnlocked, Contract, WalletLocked } from "fuels";
import * as prices_abi from "./prices-abi.json";

export abstract class FuelCommand {
  constructor(
    private contractId: string,
    private wallet: WalletLocked | WalletUnlocked
  ) {}

  abstract getFunction(contract: Contract);
  abstract getArgs(): Promise<any>;
  abstract getValue(value: any);

  async execute() {
    const contract = this.getContract();
    const args = await this.getArgs();

    const result = await this.getFunction(contract)(args).get();

    return this.getValue(result.value);
  }

  protected getContract() {
    return new Contract(this.contractId, prices_abi, this.wallet);
  }
}
