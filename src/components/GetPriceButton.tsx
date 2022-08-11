interface Props {
  getPriceFromContract: () => void;
}

export const GetPriceButton = ({ getPriceFromContract }: Props) => (
  <button
    className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full text-xl"
    onClick={getPriceFromContract}
  >
    Get prices
  </button>
);
