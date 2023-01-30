import { Prices } from "../types";
import { utils } from "ethers";

export function handlePrices(
  setPrices: (value: ((prevState: Prices) => Prices) | Prices) => void,
  prices: number[]
) {
  setPrices({
    btc: utils.formatUnits(prices[0], 8),
    eth: utils.formatUnits(prices[1], 8),
    bnb: utils.formatUnits(prices[2], 8),
    ar: utils.formatUnits(prices[3], 8),
    avax: utils.formatUnits(prices[4], 8),
    celo: utils.formatUnits(prices[5], 8),
  });
}
