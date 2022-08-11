import { ChainDetails } from "../config/chains";

interface Props {
  walletAddress: string;
  network: ChainDetails;
}

export const ChainDataTable = ({ walletAddress, network }: Props) => (
  <table className="w-1/2 table-auto border mb-8">
    <tbody className="text-md">
      <tr>
        <td className="py-3 px-6">Wallet</td>
        <td className="py-3 px-6 font-bold text-right">{walletAddress}</td>
      </tr>
      <tr>
        <td className="py-3 px-6">Contract</td>
        <td className="py-3 px-6 font-bold text-right">
          <a
            href={network.contractExplorerUrl}
            target="blank"
            referrerPolicy="no-referrer"
          >
            {network.exampleContractAddress}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
);
