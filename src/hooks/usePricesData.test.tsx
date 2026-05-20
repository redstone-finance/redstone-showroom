import { renderHook } from "@testing-library/react";
import { usePricesData } from "./usePricesData";
import redstone from "redstone-api";

jest.mock("redstone-api", () => ({
  __esModule: true,
  default: {
    getPrice: jest.fn(),
  },
}));

const mockedRedstone = redstone as jest.Mocked<typeof redstone>;

describe("usePricesData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with getPricesTimestamp function", () => {
    const { result } = renderHook(() => usePricesData());
    expect(result.current.getPricesTimestamp).toBeDefined();
    expect(typeof result.current.getPricesTimestamp).toBe("function");
  });

  it("should return the BTC timestamp from redstone API", async () => {
    const mockTimestamp = 1700000000000;
    mockedRedstone.getPrice.mockResolvedValue({
      BTC: { timestamp: mockTimestamp },
    } as any);

    const { result } = renderHook(() => usePricesData());
    const timestamp = await result.current.getPricesTimestamp();

    expect(timestamp).toBe(mockTimestamp);
    expect(mockedRedstone.getPrice).toHaveBeenCalledWith(["BTC"]);
  });

  it("should call redstone.getPrice with ['BTC']", async () => {
    mockedRedstone.getPrice.mockResolvedValue({
      BTC: { timestamp: 1234567890 },
    } as any);

    const { result } = renderHook(() => usePricesData());
    await result.current.getPricesTimestamp();

    expect(mockedRedstone.getPrice).toHaveBeenCalledTimes(1);
    expect(mockedRedstone.getPrice).toHaveBeenCalledWith(["BTC"]);
  });

  it("should throw an error if redstone API fails", async () => {
    const errorMessage = "API request failed";
    mockedRedstone.getPrice.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePricesData());

    await expect(result.current.getPricesTimestamp()).rejects.toThrow(
      errorMessage
    );
  });

  it("should handle multiple calls independently", async () => {
    mockedRedstone.getPrice
      .mockResolvedValueOnce({ BTC: { timestamp: 1000 } } as any)
      .mockResolvedValueOnce({ BTC: { timestamp: 2000 } } as any);

    const { result } = renderHook(() => usePricesData());

    const ts1 = await result.current.getPricesTimestamp();
    const ts2 = await result.current.getPricesTimestamp();

    expect(ts1).toBe(1000);
    expect(ts2).toBe(2000);
    expect(mockedRedstone.getPrice).toHaveBeenCalledTimes(2);
  });
});
