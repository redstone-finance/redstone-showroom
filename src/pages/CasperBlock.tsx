import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ReadPricesButton } from "../components/ReadPricesButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesContract } from "../hooks/usePricesContract";
import { ChainDetails } from "../config/chains";
import { Dispatch, SetStateAction } from "react";
import { Prices } from "../types";
import Modal from "../components/Modal";
import { PriceRelayAdapterCasperContractConnector } from "@redstone-finance/casper-connector";
import { WalletCasperContractConnection } from "../chains/casper/WalletCasperContractConnection";
import { GetPriceButton } from "../components/GetPriceButton";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletAddress: string;
    provider: any;
  };
  network: ChainDetails | null;
}

export const CasperBlock = ({ props, network }: Props) => {
  const { prices, setPrices, walletAddress, provider } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();

  const connector = new PriceRelayAdapterCasperContractConnector(
    WalletCasperContractConnection.make(
      provider,
      walletAddress,
      "casper-test",
      process.env.CASPER_NODE_URL
    ),
    network?.exampleContractAddress!
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

  return !provider ? (
    <p className="mt-10 mb-0 text-lg font-bold">Please sign in to Casper</p>
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
              To <b>write</b> a snapshot of current <b>prices</b> to the
              contract's storage you should have{" "}
              <b>{network?.nativeCurrency.symbol}</b> be added to the wallet.
              <br />
              {network?.label === "Sepolia" && (
                <span>
                  For sepolia is described here:&nbsp;
                  <a
                    target="blank"
                    href="https://book.starknet.io/ch02-05-01-start-with-sepolia.html"
                    referrerPolicy="no-referrer"
                  >
                    <u>
                      https://book.starknet.io/ch02-05-01-start-with-sepolia.html
                    </u>
                  </a>
                </span>
              )}
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
