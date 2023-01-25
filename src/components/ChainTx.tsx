import { ChainDetails } from "../config/chains";
import TxIcon from "../assets/icons/tx.png";

interface Props {
  txHash: string;
  network: ChainDetails;
}

export const ChainTx = ({ txHash, network }: Props) => (
  <table className="w-3/5 table-auto border mt-8">
    <tbody className="text-md">
      <tr>
        <td className="flex items-center gap-3 py-3 px-6">
          <img
            className="object-scale-down w-6 h-6"
            src={TxIcon}
            alt="Contract icon"
          />
          Last transaction:
        </td>
        <td className="py-3 px-6 text-right underline">
          <a
            href={network.txExplorerUrl + txHash}
            target="blank"
            referrerPolicy="no-referrer"
          >
            {txHash}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
);
