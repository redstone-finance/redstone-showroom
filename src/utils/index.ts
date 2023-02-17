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
  canto: "",
};

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};
