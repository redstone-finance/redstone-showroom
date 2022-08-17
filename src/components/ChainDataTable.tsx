import { ChainDetails } from "../config/chains";
import WalletIcon from "../assets/icons/wallet.png";
import ContractIcon from "../assets/icons/contract.png";

interface Props {
  walletAddress: string;
  network: ChainDetails;
}

export const ChainDataTable = ({ walletAddress, network }: Props) => (
  <table className="w-3/5 table-auto border mb-8">
    <tbody className="text-md">
      <tr>
        <td className="flex items-center gap-3 py-3 px-6">
          <img
            className="object-scale-down w-6 h-6"
            src={WalletIcon}
            alt="Wallet icon"
          />
          Your wallet
        </td>
        <td className="py-3 px-6 text-right">{walletAddress}</td>
      </tr>
      <tr>
        <td className="flex items-center gap-3 py-3 px-6">
          <img
            className="object-scale-down w-6 h-6"
            src={ContractIcon}
            alt="Contract icon"
          />
          Integrated Contract
        </td>
        <td className="py-3 px-6 text-right underline">
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
