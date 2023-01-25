import redstone from "redstone-api";

export const usePricesData = () => {
  const getPricesTimestamp = async () => {
    const pricesData = await redstone.getPrice(["BTC"]);
    return pricesData.BTC.timestamp;
  };

  return { getPricesTimestamp };
};
