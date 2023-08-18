import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ReadPricesButton } from "../components/ReadPricesButton";
import { GetPriceButton } from "../components/GetPriceButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesContract } from "../hooks/usePricesContract";
import { ChainDetails } from "../config/chains";
import { Dispatch, SetStateAction } from "react";
import { Prices } from "../types";
import Modal from "../components/Modal";
import { TonPricesContractConnector } from "@redstone-finance/ton-connector/src";
import { KeyPair } from "ton-crypto/dist/primitives/nacl";
import { ShowroomTonNetwork } from "../chains/ton/ShowroomTonNetwork";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletKey?: KeyPair;
  };
  network: ChainDetails | null;
}

export const TonBlock = ({ props, network }: Props) => {
  const { prices, setPrices, walletKey } = props;

  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();

  const tonNetwork = new ShowroomTonNetwork(() => {
    return walletKey;
  }, network!.rpcUrls[0]);
  const connector = new TonPricesContractConnector(
    tonNetwork,
    network!.exampleContractAddress
  );

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
  } = usePricesContract(
    network,
    connector,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return !walletKey ? (
    <p className="mt-10 mb-0 text-lg text-center">
      <b>Please sign in to TON</b>
      {!true && (
        <div className="px-6 py-3 text-sm w-full text-center text-gray-500 mt-8 border">
          <div className="w-full mb-2">
            The Fuel Wallet extension you can install from here:{" "}
            <b>
              <a
                target="_blank"
                href="https://wallet.fuel.network/docs/install/"
              >
                https://wallet.fuel.network/docs/install/
              </a>
            </b>
          </div>
          <div className="w-full mt-2">
            or pass your TON-wallet's <b>MNEMONIC WORDS</b> below: <br />
            <input
              className="text-sm w-full align-center gap-2 border mt-1 py-2 px-2 rounded"
              type="password"
              name="private_key"
              id="private_key"
            />
          </div>
        </div>
      )}
    </p>
  ) : (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {network && (
        <ChainDataTable
          walletAddress={tonNetwork.walletContract?.address?.toString() ?? ""}
          network={network}
        />
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
              To <b>interact with the contract</b> you should have <b>TON</b> be
              added to the wallet <br /> by using{" "}
              <b>
                <a target="_blank" href="https://t.me/testgiver_ton_bot">
                  https://t.me/testgiver_ton_bot
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
