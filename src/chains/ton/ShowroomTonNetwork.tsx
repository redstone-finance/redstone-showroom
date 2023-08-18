import { TonNetwork } from "@redstone-finance/ton-connector/src/TonNetwork";
import {
  Address,
  Contract,
  OpenedContract,
  Sender,
  TonClient,
  TonClient4,
  WalletContractV4,
} from "ton";
import { KeyPair } from "ton-crypto/dist/primitives/nacl";
import * as assert from "assert";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";

export class ShowroomTonNetwork implements TonNetwork {
  api?: TonClient4;
  oldApi?: TonClient;
  sender?: Sender;
  workchain = 0;
  walletContract?: OpenedContract<WalletContractV4>;

  constructor(
    private walletKeyProvider: () => KeyPair | undefined,
    private legacyEndpoint: string
  ) {}

  async setUp() {
    const walletKey = this.walletKeyProvider();

    assert(walletKey, "Wallet key is undefined!");

    const endpoint = await getHttpV4Endpoint({ network: "testnet" });

    const wallet = WalletContractV4.create({
      publicKey: walletKey.publicKey,
      workchain: 0,
    });

    this.api = new TonClient4({ endpoint });
    this.oldApi = new TonClient({
      endpoint: this.legacyEndpoint,
      apiKey: process.env.TONCENTER_API_KEY,
    });

    this.walletContract = this.oldApi.open(wallet);
    this.sender = this.walletContract.sender(walletKey.secretKey);
  }

  async isContractDeployed(address?: Address): Promise<boolean> {
    const seqno = await this.walletContract!.getSeqno();

    return address == undefined || this.api!.isContractDeployed(seqno, address);
  }

  async open<T extends Contract>(contract: T) {
    return this.api!.open(contract);
  }
}
