import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ReadPricesButton } from "../components/ReadPricesButton";
import { GetPriceButton } from "../components/GetPriceButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { useContractPrices } from "../hooks/useContractPrices";
import { ChainDetails } from "../config/chains";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Prices } from "../types";
import Modal from "../components/Modal";
import { FuelAdapter } from "../chains/fuel/FuelAdapter";
import { WalletLocked, WalletUnlocked } from "fuels";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletAddress: string;
    wallet: WalletLocked | WalletUnlocked | undefined;
    changePrivateKey: ChangeEventHandler<HTMLInputElement>;
  };
  network: ChainDetails | null;
}

export const FuelBlock = ({ props, network }: Props) => {
  const { prices, setPrices, walletAddress, wallet, changePrivateKey } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const adapter = new FuelAdapter(network?.exampleContractAddress!, wallet!);

  const {
    blockNumber,
    txHash,
    timestamp,
    isLoading,
    getPricesFromPayload,
    readPricesFromContract,
    writePricesToContract,
    errorMessage,
    setErrorMessage,
  } = useContractPrices(
    network,
    adapter,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return !wallet ? (
    <p className="mt-10 mb-0 text-lg text-center">
      <b>Please sign in to Fuel</b>
      {!window.fuel && (
        <div className="px-6 py-3 text-sm w-full text-center text-gray-500 mt-8 border">
          <div className="w-full mb-2">
            The Fuel Wallet extension you can install from here:{" "}
            <b>
              <a href="https://wallet.fuel.network/docs/install/">
                https://wallet.fuel.network/docs/install/
              </a>
            </b>
          </div>
          <div className="w-full mt-2">
            or pass your fuel-wallet's <b>PRIVATE KEY</b> below: <br />
            <input
              className="text-sm w-full align-center gap-2 border mt-1 py-2 px-2 rounded"
              type="password"
              name="private_key"
              id="private_key"
              onChange={changePrivateKey}
            />
          </div>
        </div>
      )}
    </p>
  ) : (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {network && (
        <ChainDataTable walletAddress={walletAddress} network={network} />
      )}
      {isMockLoading || isLoading ? (
        <GetPriceLoader text={isMockLoading ? text : ""} />
      ) : (
        [
          arePrices && (
            <PricesTable
              blockNumber={blockNumber}
              timestamp={timestamp}
              prices={prices}
            />
          ),
          <div className="flex gap-3">
            <WritePricesButton writePricesToContract={writePricesToContract} />
            <ReadPricesButton readPricesFromContract={readPricesFromContract} />
            <GetPriceButton getPriceFromContract={getPricesFromPayload} />
          </div>,

          <div className="px-6 py-3 text-sm w-3/5 text-center text-gray-500">
            <i>
              To <b>interact with the contract</b> you should have <b>ETH</b> be
              added to the wallet <br /> by using{" "}
              <b>
                <a target="_blank" href="https://faucet-beta-2.fuel.network/">
                  https://faucet-beta-2.fuel.network/
                </a>
              </b>
            </i>
          </div>,
          network && txHash && <ChainTx txHash={txHash} network={network} />,
        ]
      )}
      {!!errorMessage && (
        <Modal
          closeModal={() => setErrorMessage("")}
          title="Problem with contract interaction"
          text={errorMessage}
        />
      )}
    </div>
  );
};
