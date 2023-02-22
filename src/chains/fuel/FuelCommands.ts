import { arrayify, BN, Contract, WalletLocked, WalletUnlocked } from "fuels";
import { FuelCommand } from "./FuelCommand";
import { DataProvider } from "../../hooks/DataProvider";

export class FuelGetTimestampCommand extends FuelCommand {
  async getValue(value: BN): Promise<any> {
    return value.toNumber() * 1000;
  }

  override async getArgs(): Promise<any> {
    return Promise.resolve();
  }

  override getFunction(contract: Contract) {
    return contract.functions.read_timestamp;
  }
}

export class FuelReadPricesCommand extends FuelCommand {
  constructor(
    contractId: string,
    wallet: WalletLocked | WalletUnlocked,
    protected dataProvider: DataProvider
  ) {
    super(contractId, wallet);
  }

  override getFunction(contract: Contract) {
    return contract.functions.read_prices;
  }

  override async getArgs(): Promise<any> {
    const dataFeedNumbers = await this.dataProvider.getDataFeedNumbers();
    return dataFeedNumbers.map((feedId) => {
      return { a: 0, b: 0, c: 0, d: feedId };
    });
  }

  override async getValue(value: any[]): Promise<number[]> {
    return value.map((u256) => {
      return u256.d.toNumber(); // + u256.c.toNumber() * (2 << 64);
    });
  }
}

export class FuelGetPricesCommand extends FuelReadPricesCommand {
  override getFunction(contract: Contract) {
    return (args: any[]) => {
      return contract.functions.get_prices(args[0], args[1]);
    };
  }

  override async getArgs(): Promise<any> {
    const payloadData = await this.dataProvider.getPayloadData();
    const payloadBytes = Array.from(arrayify(payloadData));

    return [await super.getArgs(), payloadBytes];
  }
}

export class FuelWritePricesCommand extends FuelGetPricesCommand {
  override getFunction(contract: Contract) {
    return (args: any[]) => {
      return contract.functions.write_prices(args[0], args[1]);
    };
  }

  override async execute() {
    const contract = this.getContract();
    const args = await this.getArgs();

    const result = await this.getFunction(contract)(args)
      .txParams({
        gasLimit: 500000000,
        gasPrice: 1,
      })
      .call();

    return this.getValue(result.value);
  }
}
