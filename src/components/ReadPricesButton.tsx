interface Props {
  readPricesFromContract: () => void;
}

export const ReadPricesButton = ({ readPricesFromContract }: Props) => (
  <button
    className="bg-redstone bg-opacity-60 hover:opacity-75 text-white py-3 px-8 rounded-full text-xl"
    onClick={readPricesFromContract}
  >
    Read prices
  </button>
);
