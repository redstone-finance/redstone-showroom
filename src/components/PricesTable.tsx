import { Prices } from "../types";
import { formatPrice } from "../utils";

interface Props {
  blockNumber: number;
  timestamp: number;
  prices: Prices;
}

export const PricesTable = ({ blockNumber, timestamp, prices }: Props) => {
  const pricesArray = Object.entries(prices).map(([key, price]) => ({
    label: key.toUpperCase(),
    value: price,
  }));

  return (
    <table className="w-3/5 table-auto border">
      <tbody className="text-md">
        <tr>
          <td className="py-3 px-6">Block number</td>
          <td className="py-3 px-6 font-bold text-right">{blockNumber}</td>
        </tr>
        <tr>
          <td className="py-3 px-6">Timestamp</td>
          <td className="py-3 px-6 font-bold text-right">
            {new Date(timestamp).toLocaleString()}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr />
          </td>
        </tr>
        {pricesArray.map((price) => (
          <tr key={price.label}>
            <td className="py-3 px-6">{price.label}</td>
            <td className="py-3 px-6 font-bold text-right">
              {formatPrice(price.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
