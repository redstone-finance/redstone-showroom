import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ReadPricesButton } from "../components/ReadPricesButton";
import { GetPriceButton } from "../components/GetPriceButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { useStarknet } from "../hooks/useStarknet";
import { useStarknetPrices } from "../hooks/useStarknetPrices";
import { ChainDetails } from "../config/chains";
import { IStarknetWindowObject } from "@argent/get-starknet";

interface Props {
  network: ChainDetails;
  starknet: IStarknetWindowObject | undefined;
  walletAddress: string;
}

export const StarknetShowroom = ({
  network,
  starknet,
  walletAddress,
}: Props) => {
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const { prices, setPrices } = useStarknet();
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

  return (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {network && (
        <ChainDataTable walletAddress={walletAddress} network={network} />
      )}
      {isMockLoading || isLoading ? (
        <GetPriceLoader text={isMockLoading ? text : ""} />
      ) : arePrices ? (
        <PricesTable
          blockNumber={blockNumber}
          timestamp={timestamp}
          prices={prices}
        />
      ) : (
        [
          network && (
            <div className="flex gap-3">
              <WritePricesButton
                writePricesToContract={writePricesToContract}
              />
              <ReadPricesButton
                readPricesFromContract={readPricesFromContract}
              />
              <GetPriceButton getPriceFromContract={getPricesFromPayload} />
            </div>
          ),

          txHash && <ChainTx txHash={txHash} network={network} />,
        ]
      )}
    </div>
  );
};
