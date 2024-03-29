export const usePricesData = () => {
  const getPricesTimestamp = async () => {
    return Date.now();
  };

  return { getPricesTimestamp };
};
