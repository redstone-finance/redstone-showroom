export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const emptyPrices = {
  btc: "",
  eth: "",
  bnb: "",
  ar: "",
  avax: "",
  celo: "",
};
