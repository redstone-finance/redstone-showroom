interface Props {
  connectWallet: () => void;
}

export const ConnectButton = ({ connectWallet }: Props) => (
  <button
    onClick={connectWallet}
    className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full"
  >
    Connect wallet
  </button>
);
