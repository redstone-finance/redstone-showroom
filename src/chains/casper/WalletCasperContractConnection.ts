import {
  CasperClient,
  CLPublicKey,
  Contracts,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { CasperConnection } from "@redstone-finance/casper-connector";

export type ICasperProvider = {
  requestConnection: () => Promise<boolean>;
  requestSwitchAccount: () => Promise<boolean>;
  sign: (
    deployJson: string,
    publicKey: string
  ) => Promise<{
    signature: Uint8Array;
    cancelled: boolean;
    signatureHex: string;
  }>;
  signMessage: () => Promise<unknown>;
  disconnectFromSite: () => Promise<boolean>;
  isConnected: () => Promise<boolean>;
  getActivePublicKey: () => Promise<string>;
  getVersion: () => Promise<string>;
};

export class WalletCasperContractConnection extends CasperConnection {
  constructor(
    casperClient: CasperClient,
    private provider: ICasperProvider,
    private publicKey: string,
    networkName: "casper" | "casper-test"
  ) {
    super(casperClient, networkName);
  }

  static make(
    provider: ICasperProvider,
    publicKey: string,
    networkName: "casper" | "casper-test",
    nodeUrl: string
  ) {
    const casperClient = new CasperClient(nodeUrl);

    return new WalletCasperContractConnection(
      casperClient,
      provider,
      publicKey,
      networkName
    );
  }

  override getPublicKey() {
    return CLPublicKey.fromHex(this.publicKey);
  }

  override async callEntrypoint(
    contract: Contracts.Contract,
    entryPoint: string,
    csprAmount: number,
    runtimeArgs: RuntimeArgs
  ) {
    const deploy = this.makeDeploy(
      contract,
      entryPoint,
      runtimeArgs,
      csprAmount
    );

    const deployJSON = DeployUtil.deployToJson(deploy);
    const sign = await this.provider.sign(
      JSON.stringify(deployJSON),
      this.publicKey
    );

    console.warn(sign);

    const signedDeploy = DeployUtil.setSignature(
      deploy,
      sign.signature,
      this.getPublicKey()
    );

    return await this.casperClient.putDeploy(signedDeploy);
  }
}
