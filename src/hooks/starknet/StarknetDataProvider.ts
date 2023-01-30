import { DataPackagesRequestParams } from "redstone-sdk";
import { BigNumberish } from "ethers";
import axios from "axios";

export class StarknetDataProvider {
  private static dataFeedIdNumber = {
    BTC: 4346947, // 256*256*ord('B') + 256*ord('T') + ord('C')
    ETH: 4543560,
    BNB: 4345410,
    AR: 16722,
    AVAX: 1096171864,
    CELO: 1128614991,
  };

  constructor(
    private dataServiceUrl: string,
    private requestParams: DataPackagesRequestParams
  ) {}

  async getPayloadData(): Promise<any> {
    if (!this.requestParams.dataFeeds) {
      return Promise.reject("That invocation requires non-empty dataFeeds");
    }

    const payloadResponse = await axios.get(
      `${this.dataServiceUrl}/data-packages/payload?data-packages/payload?unique-signers-count=${this.requestParams.uniqueSignersCount}&data-service-id=${this.requestParams.dataServiceId}&data-feed-id=${this.requestParams.dataFeeds}&format=hex`
    );

    return StarknetDataProvider.preparePayloadData(payloadResponse.data);
  }

  async getDataFeedNumbers(): Promise<BigNumberish[]> {
    if (!this.requestParams.dataFeeds) {
      return Promise.reject("That invocation requires non-empty dataFeeds");
    }

    return this.requestParams.dataFeeds.map(
      (dataFeedId) => StarknetDataProvider.dataFeedIdNumber[dataFeedId]
    );
  }

  private static preparePayloadData(payloadHex: string) {
    let payloadData = [];
    for (let i = 2; i < Array.from(payloadHex).length - 1; i++) {
      if (i % 2 == 1) {
        continue;
      }
      payloadData[i / 2 - 1] = `0x${payloadHex[i]}${payloadHex[i + 1]}`;
    }

    return payloadData;
  }
}
