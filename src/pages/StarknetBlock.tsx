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
import { IStarknetWindowObject } from "@argent/get-starknet";
import { Dispatch, SetStateAction } from "react";
import { Prices } from "../types";
import Modal from "../components/Modal";
import {
  StarknetContractParamsProvider,
  StarknetPricesContractConnector,
} from "@redstone-finance/starknet-connector";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletAddress: string;
    starknet: IStarknetWindowObject | undefined;
  };
  network: ChainDetails | null;
}

export const StarknetBlock = ({ props, network }: Props) => {
  const { prices, setPrices, walletAddress, starknet } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();

  const connector = new StarknetPricesContractConnector(
    starknet?.account,
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
    setIsMockLoading,
    StarknetContractParamsProvider
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return !starknet ? (
    <p className="mt-10 mb-0 text-lg font-bold">Please sign in to Starknet</p>
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
              contract's storage you should have <b>testnet ETH</b> be added to
              the wallet by using:&nbsp;
              <a
                target="blank"
                href="https://faucet.goerli.starknet.io/"
                referrerPolicy="no-referrer"
              >
                <u>https://faucet.goerli.starknet.io/</u>
              </a>
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
