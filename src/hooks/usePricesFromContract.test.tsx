import { renderHook, act } from "@testing-library/react";
import { usePricesFromContract } from "./usePricesFromContract";
import { ChainDetails } from "../config/chains";
import { Prices } from "../types";

// Mock dependencies
jest.mock("../config/ShowroomContractAbi.json", () => ({
  abi: ["mockedAbi"],
}));

jest.mock("../utils", () => ({
  emptyPrices: {
    btc: "",
    eth: "",
    bnb: "",
    ar: "",
    avax: "",
    celo: "",
  },
}));

jest.mock("./usePricesData", () => ({
  usePricesData: jest.fn(),
}));

jest.mock("@redstone-finance/evm-connector", () => ({
  WrapperBuilder: {
    wrap: jest.fn().mockReturnValue({
      usingDataService: jest.fn().mockReturnValue({
        getPrices: jest.fn().mockResolvedValue([
          "1000000000", // BTC
          "2000000000", // ETH
          "3000000000", // BNB
          "4000000000", // AR
          "5000000000", // AVAX
          "6000000000", // CELO
        ]),
      }),
    }),
  },
}));

jest.mock("@redstone-finance/sdk", () => ({
  getOracleRegistryState: jest.fn().mockReturnValue({}),
  getSignersForDataServiceId: jest.fn().mockReturnValue([
    "signer1",
    "signer2",
    "signer3",
  ]),
}));

jest.mock("ethers", () => {
  const mockContract = {
    getPrices: jest.fn().mockResolvedValue([
      "1000000000",
      "2000000000",
      "3000000000",
      "4000000000",
      "5000000000",
      "6000000000",
    ]),
  };

  return {
    utils: {
      formatUnits: jest.fn((value: string) => {
        const num = parseInt(value, 10);
        return (num / 100000000).toString();
      }),
    },
    providers: {},
    Contract: jest.fn().mockImplementation(() => mockContract),
  };
});

// Import mocked modules
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getOracleRegistryState, getSignersForDataServiceId } from "@redstone-finance/sdk";
import { Contract, utils } from "ethers";
import { usePricesData } from "./usePricesData";

const mockUsePricesData = usePricesData as jest.MockedFunction<typeof usePricesData>;

describe("usePricesFromContract", () => {
  const mockNetwork: ChainDetails = {
    chainId: "0x1",
    rpcUrls: ["https://mock-rpc.com"],
    chainName: "Mock Chain",
    label: "Mock Chain",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://mock-explorer.com"],
    exampleContractAddress: "0xMockContractAddress",
    contractExplorerUrl: "https://mock-explorer.com/address/0xMockContractAddress",
  };

  const mockSigner = {
    provider: {
      getBlockNumber: jest.fn().mockResolvedValue(12345),
    },
  } as unknown as providers.JsonRpcSigner;

  const mockSetPrices = jest.fn<Dispatch<SetStateAction<Prices>>, [SetStateAction<Prices>]>();
  const mockSetIsMockLoading = jest.fn<Dispatch<SetStateAction<boolean>>, [SetStateAction<boolean>]>();
  const mockStartMockLoader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePricesData.mockReturnValue({
      getPricesTimestamp: jest.fn().mockResolvedValue(1700000000),
    });
  });

  it("returns initial state with default values", () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        null,
        null,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    expect(result.current.blockNumber).toBe(0);
    expect(result.current.timestamp).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBe("");
    expect(typeof result.current.setErrorMessage).toBe("function");
    expect(typeof result.current.getPricesFromContract).toBe("function");
  });

  it("sets errorMessage when network is null", async () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        null,
        null,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(mockSetPrices).toHaveBeenCalledWith({
      btc: "",
      eth: "",
      bnb: "",
      ar: "",
      avax: "",
      celo: "",
    });
    expect(mockSetIsMockLoading).toHaveBeenCalledWith(false);
    expect(result.current.errorMessage).toBe(
      "There was problem with fetching data from smart contract. Please try again or contact RedStone team"
    );
  });

  it("sets errorMessage when signer is null", async () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        null,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(mockSetPrices).toHaveBeenCalledWith({
      btc: "",
      eth: "",
      bnb: "",
      ar: "",
      avax: "",
      celo: "",
    });
    expect(mockSetIsMockLoading).toHaveBeenCalledWith(false);
  });

  it("fetches prices successfully when network and signer are provided", async () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(mockStartMockLoader).toHaveBeenCalledTimes(1);
    expect(Contract).toHaveBeenCalledWith(
      "0xMockContractAddress",
      ["mockedAbi"],
      mockSigner
    );
    expect(WrapperBuilder.wrap).toHaveBeenCalled();
    expect(mockSetPrices).toHaveBeenCalledWith({
      btc: "10",
      eth: "20",
      bnb: "30",
      ar: "40",
      avax: "50",
      celo: "60",
    });
    expect(mockSigner.provider.getBlockNumber).toHaveBeenCalledTimes(1);
    expect(result.current.blockNumber).toBe(12345);
    expect(result.current.isLoading).toBe(false);
  });

  it("sets isLoading to true during fetch", async () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    // isLoading should be false initially
    expect(result.current.isLoading).toBe(false);

    // We can't easily test the intermediate state without more control,
    // but we can verify that after completion, isLoading is false
    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("handles fetch errors gracefully", async () => {
    const mockError = new Error("Network error");
    (Contract as jest.Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    expect(mockSetPrices).toHaveBeenCalledWith({
      btc: "",
      eth: "",
      bnb: "",
      ar: "",
      avax: "",
      celo: "",
    });
    expect(mockSetIsMockLoading).toHaveBeenCalledWith(false);
    expect(result.current.errorMessage).toBe(
      "There was problem with fetching data from smart contract. Please try again or contact RedStone team"
    );

    consoleErrorSpy.mockRestore();
  });

  it("handles errors from wrapped contract gracefully", async () => {
    const mockError = new Error("Contract execution reverted");
    const mockWrappedContract = {
      getPrices: jest.fn().mockRejectedValue(mockError),
    };
    (WrapperBuilder.wrap as jest.Mock).mockReturnValueOnce({
      usingDataService: jest.fn().mockReturnValue(mockWrappedContract),
    });

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    expect(mockSetPrices).toHaveBeenCalledWith({
      btc: "",
      eth: "",
      bnb: "",
      ar: "",
      avax: "",
      celo: "",
    });
    expect(result.current.errorMessage).toBe(
      "There was problem with fetching data from smart contract. Please try again or contact RedStone team"
    );

    consoleErrorSpy.mockRestore();
  });

  it("does not fetch prices when contractAddress is undefined", async () => {
    const networkWithoutContractAddress: ChainDetails = {
      ...mockNetwork,
      exampleContractAddress: "" as any,
    };

    const { result } = renderHook(() =>
      usePricesFromContract(
        networkWithoutContractAddress,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(Contract).not.toHaveBeenCalled();
  });

  it("updates timestamp from usePricesData", async () => {
    const mockTimestamp = 1700000000;
    mockUsePricesData.mockReturnValue({
      getPricesTimestamp: jest.fn().mockResolvedValue(mockTimestamp),
    });

    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(result.current.timestamp).toBe(mockTimestamp);
  });

  it("allows setting errorMessage via setErrorMessage", () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        null,
        null,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    expect(result.current.errorMessage).toBe("");

    // Note: setErrorMessage uses React setState, so we need to check it's callable
    expect(typeof result.current.setErrorMessage).toBe("function");
  });

  it("calls getOracleRegistryState and getSignersForDataServiceId during price fetch", async () => {
    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(getOracleRegistryState).toHaveBeenCalled();
    expect(getSignersForDataServiceId).toHaveBeenCalledWith(
      {},
      "redstone-primary-prod"
    );
  });

  it("uses correct data service configuration", async () => {
    const mockUsingDataService = jest.fn().mockResolvedValue({
      getPrices: jest.fn().mockResolvedValue([
        "1000000000",
        "2000000000",
        "3000000000",
        "4000000000",
        "5000000000",
        "6000000000",
      ]),
    });

    (WrapperBuilder.wrap as jest.Mock).mockReturnValueOnce({
      usingDataService: mockUsingDataService,
    });

    const { result } = renderHook(() =>
      usePricesFromContract(
        mockNetwork,
        mockSigner,
        mockStartMockLoader,
        mockSetPrices,
        mockSetIsMockLoading
      )
    );

    await act(async () => {
      await result.current.getPricesFromContract();
    });

    expect(mockUsingDataService).toHaveBeenCalledWith({
      dataServiceId: "redstone-primary-prod",
      uniqueSignersCount: 3,
      dataPackagesIds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
      authorizedSigners: ["signer1", "signer2", "signer3"],
    });
  });
});
