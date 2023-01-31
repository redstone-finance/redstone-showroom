import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { GetPriceButton } from "../components/GetPriceButton";
import { useMockLoader } from "../hooks/useMockLoader";
import { useStarknet } from "../hooks/useStarknet";
import { ChainDetails } from "../config/chains";
import { usePricesFromContract } from "../hooks/usePricesFromContract";
import { providers } from "ethers";

interface Props {
  network: ChainDetails;
  signer: providers.JsonRpcSigner | null;
  walletAddress: string;
}

export const EthShowroom = ({ network, signer, walletAddress }: Props) => {
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const { prices, setPrices } = useStarknet();
  const { blockNumber, timestamp, isLoading, getPricesFromContract } =
    usePricesFromContract(
      network,
      signer,
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
        network && (
          <GetPriceButton getPriceFromContract={getPricesFromContract} />
        )
      )}
    </div>
  );
};
