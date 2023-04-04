interface Props {
  writePricesToContract: () => void;
}

export const WritePricesButton = ({ writePricesToContract }: Props) => (
  <button
    className="bg-gray-400 hover:opacity-75 text-white py-3 px-8 rounded-full text-xl"
    onClick={writePricesToContract}
  >
    Write prices
  </button>
);
