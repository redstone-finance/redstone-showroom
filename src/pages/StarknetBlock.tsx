import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ReadPricesButton } from "../components/ReadPricesButton";
import { GetPriceButton } from "../components/GetPriceButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { useStarknetPrices } from "../hooks/useStarknetPrices";
import { ChainDetails } from "../config/chains";
import { IStarknetWindowObject } from "@argent/get-starknet";
import { Dispatch, SetStateAction } from "react";
import { Prices } from "../types";

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
  const {
    blockNumber,
    txHash,
    timestamp,
    isLoading,
    getPricesFromPayload,
    readPricesFromContract,
    writePricesToContract,
  } = useStarknetPrices(
    network,
    starknet,
    startMockLoader,
    setPrices,
    setIsMockLoading
  );

  const arePrices = Object.values(prices).every((price) => !!price);

  return !starknet ? (
    <div />
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

          <div className="px-6 py-3 text-sm w-3/5 text-center">
            <i>
              To <b>write</b> a snapshot of current <b>prices</b> to the
              contract's storage you should have <b>testnet ETH</b> be added to
              the wallet by using:&nbsp;
              <a target={"blank"} href="https://faucet.goerli.starknet.io/">
                https://faucet.goerli.starknet.io/
              </a>
            </i>
          </div>,
          network && txHash && <ChainTx txHash={txHash} network={network} />,
        ]
      )}
    </div>
  );
};
